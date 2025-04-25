from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.init import get_db
from models import model
from schemas.schema import FreeFacultyRequest

router = APIRouter()

@router.post("/api/free-faculty")
def get_free_faculty(payload: FreeFacultyRequest, db: Session = Depends(get_db)):
    # Get matching roomslot_ids
    roomslots = db.query(model.RoomSlot).filter_by(day_order=payload.day_order, slot_id=payload.slot_id).all()
    roomslot_ids = [r.roomslot_id for r in roomslots]

    if not roomslot_ids:
        return []

    # Get faculty IDs already scheduled in those roomslots
    busy = db.query(model.Timetable.faculty_id).filter(model.Timetable.roomslot_id.in_(roomslot_ids)).distinct()
    busy_ids = [b.faculty_id for b in busy]

    # Get free faculty
    free_faculty = db.query(model.Faculty).filter(~model.Faculty.faculty_id.in_(busy_ids)).all()

    # Return in required format
    return [
        {
            "id": str(f.faculty_id),
            "name": f.name,
            "status": "FREE",
            "subject": None,
            "section": None
        } for f in free_faculty
    ]
