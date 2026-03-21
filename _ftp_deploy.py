#!/usr/bin/env python3
"""
KAWAZOE CREW - FTP Deploy Script
Uploads out/ directory to kawazoe-architects.com/crew/
"""
import ftplib
import os
from pathlib import Path

HOST = "153.122.170.25"
PORT = 21
USER = "effect"
PASS = "login0120$$$"
LOCAL_DIR = Path(__file__).parent / "out"
REMOTE_BASE = "kawazoe-architects.com/crew"


def ensure_remote_dir(ftp, remote_path):
    parts = remote_path.split("/")
    current = ""
    for part in parts:
        if not part:
            continue
        current = current + "/" + part if current else part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass  # already exists


def upload_dir(ftp, local_dir, remote_dir):
    ensure_remote_dir(ftp, remote_dir)
    for item in sorted(local_dir.iterdir()):
        remote_path = remote_dir + "/" + item.name
        if item.is_dir():
            upload_dir(ftp, item, remote_path)
        else:
            with open(item, "rb") as f:
                ftp.storbinary("STOR " + remote_path, f)
            print(f"  uploaded: {remote_path}")


def main():
    print(f"Connecting to {HOST}...")
    ftp = ftplib.FTP()
    ftp.connect(HOST, PORT, timeout=30)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    print("Connected OK")
    print(f"Uploading {LOCAL_DIR} => {REMOTE_BASE}/")
    upload_dir(ftp, LOCAL_DIR, REMOTE_BASE)
    ftp.quit()
    print("\nDone! https://kawazoe-architects.com/crew/")


if __name__ == "__main__":
    main()
