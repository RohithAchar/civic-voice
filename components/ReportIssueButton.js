"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";

export default function ReportIssueButton() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
    if (image) {
      // TODO: Handle image submission
      console.log("Submitting image:", image);
      // Reset after submission
      handleRemoveImage();
    }
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
        <div className="relative max-w-md mx-auto">
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
          <Button onClick={handleSubmit} size="lg" className="w-full mt-4">
            Report This Issue
          </Button>
        </div>
      )}
    </div>
  );
}
