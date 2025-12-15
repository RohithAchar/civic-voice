"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Loader2 } from "lucide-react";

export default function ReportIssueButton() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }
    setLocationError("");
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        setLocationLoading(false);
      },
      (err) => {
        setLocationError(err.message || "Unable to fetch location.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (!location) getCurrentLocation();
    }
  };

  const handleTakePicture = () => {
    // Try to use camera directly
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          streamRef.current = stream;
          setShowCamera(true);
          // Start video stream when component updates
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          }, 100);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          // Fallback to file input with capture attribute
          cameraInputRef.current?.click();
        });
    } else {
      // Fallback to file input
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setImage(blob);
            setPreview(URL.createObjectURL(blob));
            if (!location) getCurrentLocation();
            stopCamera();
          }
        },
        "image/jpeg",
        0.9
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleUploadPicture = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!image) return;

    const payload = {
      description,
      issueType,
      location,
      image,
    };

    // TODO: replace with real submit to backend
    console.log("Submitting report:", payload);

    // Reset after submission
    handleRemoveImage();
    setDescription("");
    setIssueType("");
    setLocation("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleTakePicture}
          size="lg"
          className="text-base px-8 py-6 h-auto"
        >
          <Camera className="mr-2 h-5 w-5" />
          Take Picture
        </Button>
        <Button
          onClick={handleUploadPicture}
          size="lg"
          variant="outline"
          className="text-base px-8 py-6 h-auto"
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Photo
        </Button>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <Button
                onClick={capturePhoto}
                size="lg"
                className="rounded-full w-16 h-16 p-0"
              >
                <Camera className="h-6 w-6" />
              </Button>
              <Button
                onClick={stopCamera}
                variant="destructive"
                size="lg"
                className="rounded-full w-16 h-16 p-0"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image preview */}
      {preview && (
        <div className="relative max-w-2xl mx-auto space-y-4">
          <div className="relative rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain"
            />
            <Button
              onClick={handleRemoveImage}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
                className="min-h-[100px] rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Type of Civic Problem
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none ring-offset-2 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="">Select a type</option>
                <option value="pothole">Pothole / Road Damage</option>
                <option value="waste">Garbage / Waste</option>
                <option value="lighting">Street Light</option>
                <option value="water">Water / Drainage</option>
                <option value="electricity">Electricity</option>
                <option value="public-safety">Public Safety</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Share location or address"
                className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="h-8"
                >
                  {locationLoading && (
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  )}
                  Use current location
                </Button>
                {location && !locationLoading && (
                  <span className="text-green-600 dark:text-green-400">
                    Auto-detected
                  </span>
                )}
                {locationError && (
                  <span className="text-red-500">{locationError}</span>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full mt-2"
            disabled={!description || !issueType || !location}
          >
            Report This Issue
          </Button>
        </div>
      )}
    </div>
  );
}
