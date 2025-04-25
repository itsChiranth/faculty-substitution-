from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.init import get_db
from models import model
from schemas.schema import FreePeriodResponse

router = APIRouter()

@router.get("/api/my-free-periods/{faculty_id}", response_model=list[FreePeriodResponse])
def get_my_free_periods(faculty_id: int, db: Session = Depends(get_db)):
    # Fetch all RoomSlots
    all_slots = db.query(model.RoomSlot).all()

    # Fetch roomslot_ids where faculty is scheduled
    busy_roomslot_ids = db.query(model.Timetable.roomslot_id).filter(
        model.Timetable.faculty_id == faculty_id
    ).all()

    # Extract only the IDs (flatten the result)
    busy_ids = [roomslot_id for (roomslot_id,) in busy_roomslot_ids]

    # Filter out busy slots
    free_slots = [slot for slot in all_slots if slot.roomslot_id not in busy_ids]

    # Return list of free day_order + slot_id
    return [{"day_order": slot.day_order, "slot_id": slot.slot_id} for slot in free_slots]
