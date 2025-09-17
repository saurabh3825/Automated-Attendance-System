import cv2
import face_recognition
import pickle
import os
import firebase_admin
from firebase_admin import credentials, db
from supabase import create_client, Client

# ----------------- FIREBASE SETUP -----------------
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://attendance-ef3d7-default-rtdb.firebaseio.com/"
})

# ----------------- SUPABASE SETUP -----------------
SUPABASE_URL = "https://wegyosgeabmjmmzgvbtd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZ3lvc2dlYWJtam1temd2YnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjE0MDUsImV4cCI6MjA3MzU5NzQwNX0.g9JcEcXd0n_6ZuQGJhu5fzkMjok-TpSUNATNypQPTbw"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ----------------- IMAGE ENCODING -----------------
folderPath = 'Images'
pathList = os.listdir(folderPath)
print("Found images:", pathList)

imgList = []
studentIds = []

for path in pathList:
    imgPath = os.path.join(folderPath, path)
    img = cv2.imread(imgPath)

    if img is None:
        print(f"⚠️ Could not read {path}")
        continue

    imgList.append(img)
    studentId = os.path.splitext(path)[0]
    studentIds.append(studentId)

    # Upload to Supabase storage
    with open(imgPath, "rb") as f:
        try:
            supabase.storage.from_("student-images").upload(path, f, {"upsert": True})
            print(f"✅ Uploaded {path} to Supabase")
        except Exception as e:
            print(f"❌ Error uploading {path}: {e}")

print("Student IDs:", studentIds)

def findEncodings(imagesList):
    encodeList = []
    for idx, img in enumerate(imagesList):
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodings = face_recognition.face_encodings(img)
        if encodings:
            encodeList.append(encodings[0])
        else:
            print(f"⚠️ No face found in image for {studentIds[idx]}")
    return encodeList

print("Encoding Started ...")
encodeListKnown = findEncodings(imgList)
encodeListKnownWithIds = [encodeListKnown, studentIds]
print("Encoding Complete")

with open("EncodeFile.p", 'wb') as file:
    pickle.dump(encodeListKnownWithIds, file)

print("✅ Encode File Saved as EncodeFile.p")
