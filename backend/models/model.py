from sqlalchemy import Column, Integer, String, ForeignKey
from database.init import Base

class Faculty(Base):
    __tablename__ = "Faculty"
    faculty_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    department = Column(String(100))

class RoomSlot(Base):
    __tablename__ = "RoomSlot"
    roomslot_id = Column(Integer, primary_key=True)
    day_order = Column(Integer)
    slot_id = Column(String(10))
    room_no = Column(String(10))

class Timetable(Base):
    __tablename__ = "Timetable"
    timetable_id = Column(Integer, primary_key=True)
    faculty_id = Column(Integer, ForeignKey("Faculty.faculty_id"))
    roomslot_id = Column(Integer, ForeignKey("RoomSlot.roomslot_id"))
    course_code = Column(String(10))
    section = Column(String(10))  

class Course(Base):
    __tablename__ = "Course"
    course_code = Column(String(10), primary_key=True)
    course_name = Column(String(100))


class FacultyCourse(Base):
    __tablename__ = "FacultyCourse"
    faculty_id = Column(Integer, ForeignKey("Faculty.faculty_id"), primary_key=True)
    course_code = Column(String(10), ForeignKey("Course.course_code"), primary_key=True)
