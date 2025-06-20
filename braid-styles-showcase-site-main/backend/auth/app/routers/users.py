# routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, auth, utils, database

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=schemas.UserProfile)
def get_current_user(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserProfile)
def update_profile(
    data: schemas.UserProfile,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if data.email:
        current_user.email = data.email
    if data.full_name:
        current_user.full_name = data.full_name
    if data.profile_image:
        current_user.profile_image = data.profile_image

    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/password")
def update_password(
    data: schemas.UserPasswordUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not utils.verify(data.old_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    
    current_user.hashed_password = utils.hash(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
