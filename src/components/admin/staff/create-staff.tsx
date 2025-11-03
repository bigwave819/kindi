"use client";

import { useState } from "react";
import { createStaffAction } from "@/actions/admin-actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CloudinarySignature = {
  signature: string;
  timestamp: number;
  apiKey: string;
};

type StaffFormFields = {
  name: string;
  phone: string;
  post: string;
  gender: string;
  salary: number;
  file: File | null;
};

function CreateStaff() {
  const [isUploading, setIsUploading] = useState(false);
  const [formState, setFormState] = useState<StaffFormFields>({
    name: "",
    phone: "",
    post: "",
    gender: "",
    salary: 0,
    file: null,
  });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => ({ ...prev, file }));
    }
  };

  const handleSelectChange = (name: keyof StaffFormFields, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  async function getCloudinarySignature(): Promise<CloudinarySignature> {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const response = await fetch("/api/cloudinary/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp }),
    });

    if (!response.ok) throw new Error("Failed to create signature");

    return response.json();
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.file) return alert("Please select an image");

    setIsUploading(true);

    try {
      const { signature, timestamp, apiKey } = await getCloudinarySignature();

      const cloudinaryData = new FormData();
      cloudinaryData.append("file", formState.file);
      cloudinaryData.append("api_key", apiKey);
      cloudinaryData.append("timestamp", timestamp.toString());
      cloudinaryData.append("signature", signature);
      cloudinaryData.append("folder", "kindi_coffee_shop");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`
      );

      const cloudinaryPromise = new Promise<any>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Upload to Cloudinary failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Cloudinary upload error"));
      });

      xhr.send(cloudinaryData);

      const cloudinaryResponse = await cloudinaryPromise;

      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("phone", formState.phone);
      formData.append("post", formState.post);
      formData.append("gender", formState.gender);
      formData.append("salary", formState.salary.toString());
      formData.append("fileUrl", cloudinaryResponse.secure_url);

      const result = await createStaffAction(formData);

      if (result.success) {
        setFormState({ name: "", phone: "", post: "", gender: "", salary: 0, file: null });
        alert("Staff successfully added ✅");
      } else {
        throw new Error("Error uploading staff");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload staff");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="justify-center">
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Upload the Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-3">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Phone</Label>
              <Input
                type="text"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                placeholder="+250 000 000 000"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Post</Label>
              <Select
                value={formState.post}
                onValueChange={(value) => handleSelectChange("post", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Barista">Barista</SelectItem>
                  <SelectItem value="Chef">Chef</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Gender</Label>
              <Select
                value={formState.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={formState.salary}
                onChange={handleInputChange}
                placeholder="000000"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Image Profile</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} required />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="cursor-pointer bg-[#6F4E37] hover:bg-[#3f2c1f] w-full"
                disabled={isUploading}
              >
                {isUploading ? "Uploading ..." : "Upload the Staff"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateStaff;
