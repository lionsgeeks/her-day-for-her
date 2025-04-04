"use client";

import { useState } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SuccessModal } from "@/components/success-modal";
import { ImageIcon, XCircle } from "lucide-react";

const breadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function HeroContentPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { data, setData, post, processing } = useForm({
    section: "hero",
    content: {
      title: "",
      subtitle: "",
      date: "",
      location: "",
      attendees: "",
      image: null,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData("content", { ...data.content, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("content", { ...data.content, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData("content", { ...data.content, image: null });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("section", data.section);

    let content = JSON.stringify(data.content);


    formData.append("content",content);
    if (data.content.image) {
      formData.append("image", data.content.image);
    }

    

    post(route("content.hero.store"), {
      data: formData,
      onSuccess: () => {
        setShowSuccessModal(true);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Hero Content" />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Hero Title</Label>
              <Input maxLength={"100"} id="title" name="title" value={data.content.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" value={data.content.date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input maxLength={"40"} id="location" name="location" value={data.content.location} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees</Label>
              <Input type="number" min={0} id="attendees" name="attendees" value={data.content.attendees} onChange={handleChange} required />
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div className="space-y-2 md:col-span-2 relative border-dashed border-2 p-3 border-muted flex flex-col items-center gap-y-2 rounded-lg">
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                className="absolute top-0 opacity-0 w-full h-full"
                onChange={handleImageChange}
              />
              <Label htmlFor="image-upload">Section Image</Label>
              <div className="mb-4 text-muted-foreground">
                <ImageIcon className="h-12 w-12" />
              </div>

              {imagePreview && (
                <div className="relative mt-2">
                  <img src={imagePreview} alt="Preview" className="w-fullrounded-md shadow-md" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    onClick={removeImage}
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Hero Subtitle</Label>
            <Textarea id="subtitle" name="subtitle" value={data.content.subtitle} onChange={handleChange} rows={3} required />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={processing} className="bg-[#03329b] hover:bg-[#03329b]/90">
              {processing ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>

      {/* 🟢 HERO PREVIEW SECTION */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-alpha/90 to-[#fd5f90]/70 z-10"></div>
          <div className="absolute inset-0 z-0">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center px-12">
            <div className="container">
              <div className="max-w-3xl text-white space-y-4">
                <div className="inline-block bg-white text-[#03329b] px-3 py-1 text-sm font-medium rounded-full">
                  {data.content.date}
                </div>
                <h1 className="text-4xl font-bold">{data.content.title}</h1>
                <p className="text-lg opacity-90">{data.content.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span>{data.content.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{data.content.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{data.content.attendees} Attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Changes Saved!" message="Your hero section content has been successfully updated." />
    </AppLayout>
  );
}
