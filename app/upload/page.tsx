"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Slider from "../components/Slider";
import GMap from "../components/GMap";
import useResizeTextarea from "../components/hooks/useResizeTextarea";
import { Question } from "@prisma/client";
import axios from "axios";
import Button from "../components/Button";
import useUploadForm from "../components/hooks/useUploadForm";
import TextareaInputGroup from "../components/TextareaInputGroup";
import TextInputGroup from "../components/TextInputGroup";

const Upload = () => {
  const {
    handleMapClick,
    handleSubmit,
    handleUpload,
    handleYearSlider,
    loading,
    handleDescriptionChange,
    year,
    description,
    author,
    location,
    locationError,
    descriptionError,
    imageUrl,
    imageError,
    handleAuthorChange,
  } = useUploadForm();

  return (
    <form
      action=""
      id="uploadForm"
      className="flex w-full flex-col items-center gap-8 px-6  py-8 md:h-full"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex w-full grow flex-col gap-8 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="relative flex h-full flex-col gap-1">
                <ImageUpload
                  handleUpload={handleUpload}
                  imageUrl={imageUrl}
                  error={imageError}
                />
                {imageError && (
                  <p className="absolute right-1 top-1 flex justify-center text-sm text-red-400">
                    Please choose a photo!
                  </p>
                )}
              </div>
              <TextareaInputGroup
                label={"What is happening on this photo?"}
                onChange={handleDescriptionChange}
                error={descriptionError}
                value={description}
                errorMessage={"Please provide description!"}
              />
              <TextInputGroup
                label={"Who took this photo?"}
                handleAuthorChange={handleAuthorChange}
                value={author}
              />
              <div className="flex flex-col gap-2">
                <h3>What year the photo was taken?</h3>
                <Slider year={year} onChange={handleYearSlider} />
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex  h-full flex-col gap-2">
                <div
                  className={`relative h-[75vh] w-full rounded lg:h-full
            
            ${locationError ? "border border-red-400 " : "border-transparent"}
            `}
                >
                  {locationError && (
                    <div className="absolute -top-6 right-1 text-sm text-red-400">
                      Please point the place on the map!
                    </div>
                  )}
                  {/* <div className="h-full w-full bg-green-300"></div> */}
                  <GMap
                    handleMapClick={handleMapClick}
                    currentMarker={location}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button label="Create question" type="submit" />
        </>
      )}
    </form>
  );
};

export default Upload;
