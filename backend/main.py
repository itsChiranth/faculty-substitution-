from fastapi import FastAPI

from routers import free_faculty
from fastapi.middleware.cors import CORSMiddleware
from routers import free_faculty, free_periods, faculty_subjects,faculty_availability
app = FastAPI()

# Allow frontend requests (like React at localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(free_faculty.router)
app.include_router(free_periods.router)
app.include_router(faculty_subjects.router)
app.include_router(faculty_availability.router)