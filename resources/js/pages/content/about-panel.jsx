"use client";

import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SuccessModal } from "@/components/success-modal";
import { ImageIcon } from "lucide-react";

const breadcrumbs = [{ title: "Dashboard", href: "/dashboard" }];

export default function AboutContentPage() {
  const { about } = usePage().props;
  const [imagePreview, setImagePreview] = useState(about?.content.image || null);

  

  const { data, setData, post, processing } = useForm({
    section: "about",
    content: {

      title: about?.content.title || "",
      mainText: about?.content.mainText || "",
      secondaryText: about?.content.secondaryText || "",
      image: about?.content.image || null,
      stats: {
        attendees: about?.content.stats?.attendees || "",
        speakers: about?.content.stats?.speakers || "",
        sessions: about?.content.stats?.sessions || "",
        days: about?.content.stats?.days || "",
      },
    }
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setData((prevData) => {
        const updatedData = { ...prevData, content: { ...prevData.content, image: file } };
        return updatedData;
      });
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    
  };
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setData("content", { ...data.content, [name]: value });
  };

  const handleStatsChange = (e) => {

    const { name, value } = e.target;
    setData("content", {
      ...data.content,
      stats: {
        ...data.content.stats,
        [name]: value,
      },
    });



  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("section", data.section);

    let content = JSON.stringify(data.content);


    formData.append("content", content);
    if (data.content.image) {
      formData.append("image", data.content.image);
    }



    post(route("content.store"), {
      data: formData,
      onSuccess: () => {
        setShowSuccessModal(true);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About Content" />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              name="title"
              value={data.content.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainText">Main Text</Label>
            <Textarea
              id="mainText"
              name="mainText"
              value={data.content.mainText}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryText">Secondary Text</Label>
            <Textarea
              id="secondaryText"
              name="secondaryText"
              value={data.content.secondaryText}
              onChange={handleChange}
              rows={4}
              required
            />
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
  
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["attendees", "speakers", "sessions", "days"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    type="number"
                    name={field}
                    value={data.content.stats[field]}
                    onChange={handleStatsChange}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-[#03329b] hover:bg-[#03329b]/90">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Preview Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={imagePreview}
                alt="About"
                className="rounded-lg shadow-md w-full h-3/4 object-contain"
              />
            </div>
            <div>
              <div className="inline-block bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium rounded-full mb-2">
                About the Conference
              </div>
              <h2 className="text-2xl font-bold mb-4">{data.content.title}</h2>
              <p className="text-gray-600 mb-4">{data.content.mainText}</p>
              <p className="text-gray-600 mb-6">{data.content.secondaryText}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-[#fd5f90]">{data.content.stats.attendees}</div>
                  <p className="text-sm text-gray-500">Attendees from around the world</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#fd5f90]">{data.content.stats.speakers}</div>
                  <p className="text-sm text-gray-500">Expert speakers and workshop leaders</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#fd5f90]">{data.content.stats.sessions}</div>
                  <p className="text-sm text-gray-500">Sessions across multiple tracks</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#fd5f90]">{data.content.stats.days}</div>
                  <p className="text-sm text-gray-500">Days of inspiration and connection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Changes Saved!"
        message="Your about section content has been successfully updated."
      />
    </AppLayout>
  );
}
