from pydantic import BaseModel

class FreeFacultyRequest(BaseModel):
    day_order: int
    slot_id: str

class FreePeriodResponse(BaseModel):
    day_order: int
    slot_id: str

class FacultySubjectResponse(BaseModel):
    code: str
    name: str
    slot: str
    day_order: int

class FacultyAvailabilityInput(BaseModel):
    day_order: int
    slot_id: str

class FacultyBasicInfo(BaseModel):
    faculty_id: int
    name: str
    department: str