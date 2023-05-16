import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { Question } from "@prisma/client";
import axios from "axios";

const useUploadForm = () => {
  const [year, setYear] = useState(1963);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState<Coordinates>();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleYearSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.currentTarget.value));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setLocationError(false);
    setLocation({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.value.length === 0);
  };

  const setErrors = () => {
    if (!location) setLocationError(true);
    if (!imageUrl) setImageError(true);
    if (!description) setDescriptionError(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const isValid = location && imageUrl && description;

    if (!isValid) {
      setErrors();
      setLoading(false);
      return;
    }

    const data: Partial<Question> = {
      description: description,
      lat: location!.lat.toString(),
      lng: location!.lng.toString(),
      imageSrc: imageUrl,
      year: year,
      author: author,
    };

    axios.post("/api/newQuestion", data);

    router.push("/upload/success");

    setLoading(false);
  };

  const handleUpload = (res: any) => {
    if (!res?.info?.secure_url) return;
    setImageError(false);
    setImageUrl(res.info.secure_url);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);

  return {
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
  };
};

export default useUploadForm;
