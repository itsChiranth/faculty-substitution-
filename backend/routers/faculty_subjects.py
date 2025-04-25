from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.init import get_db
from models import model
from schemas.schema import FacultySubjectResponse

router = APIRouter()

@router.get("/api/faculty-subjects/{faculty_id}", response_model=list[FacultySubjectResponse])
def get_subjects_for_faculty(faculty_id: int, db: Session = Depends(get_db)):
    results = (
        db.query(
            model.Course.course_code.label("code"),
            model.Course.course_name.label("name"),
            model.RoomSlot.slot_id.label("slot"),
            model.RoomSlot.day_order
        )
        .join(model.FacultyCourse, model.FacultyCourse.course_code == model.Course.course_code)
        .join(model.Timetable, model.Timetable.course_code == model.Course.course_code)
        .join(model.RoomSlot, model.RoomSlot.roomslot_id == model.Timetable.roomslot_id)
        .filter(model.FacultyCourse.faculty_id == faculty_id)
        .all()
    )

    return [dict(r._mapping) for r in results]
