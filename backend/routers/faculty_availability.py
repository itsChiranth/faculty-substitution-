# routers/faculty_availability.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.init import get_db
from models import model
from schemas import schema

router = APIRouter()

@router.post("/api/faculty-availability")
def check_faculty_availability(payload: schema.FacultyAvailabilityInput, db: Session = Depends(get_db)):
    # Step 1: Find all faculty busy at the given day_order and slot_id
    busy_faculties = (
        db.query(model.Timetable.faculty_id)
        .join(model.RoomSlot, model.Timetable.roomslot_id == model.RoomSlot.roomslot_id)
        .filter(
            model.RoomSlot.day_order == payload.day_order,
            model.RoomSlot.slot_id == payload.slot_id
        )
        .distinct()
        .all()
    )
    busy_faculty_ids = [f[0] for f in busy_faculties]

    # Step 2: Get all faculties and mark them as FREE or BUSY
    all_faculties = db.query(model.Faculty).all()
    result = []

    for faculty in all_faculties:
        if faculty.faculty_id in busy_faculty_ids:
            # Get the subject name if busy
            busy_info = (
                db.query(model.Timetable.course_code)
                .join(model.RoomSlot, model.Timetable.roomslot_id == model.RoomSlot.roomslot_id)
                .filter(
                    model.Timetable.faculty_id == faculty.faculty_id,
                    model.RoomSlot.day_order == payload.day_order,
                    model.RoomSlot.slot_id == payload.slot_id
                )
                .first()
            )
            result.append({
                "id": faculty.faculty_id,
                "name": faculty.name,
                "status": "BUSY",
                "subject": busy_info.course_code if busy_info else None,
                "section": None  # Add section if available later
            })
        else:
            result.append({
                "id": faculty.faculty_id,
                "name": faculty.name,
                "status": "FREE",
                "subject": None,
                "section": None
            })

    return result
