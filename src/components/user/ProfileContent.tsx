// components/user/profile/ProfileContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, MapPin, Phone, Save, ArrowLeft } from "lucide-react";
import { updateProfileAction } from "@/actions/user-actions";

// Rwanda districts for dropdown
const rwandaDistricts = ["Gasabo", "Kicukiro", "Nyarugenge"];

interface ProfileContentProps {
  session: any;
  dbUser?: any; // Passed from server component
}

export default function ProfileContent({ session, dbUser }: ProfileContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    address: "",
  });

  // Initialize formData from dbUser or session
  useEffect(() => {
    const userSource = dbUser || session?.user;
    if (userSource) {
      setFormData({
        name: userSource.name || "",
        email: userSource.email || "",
        phone: userSource.phone || "",
        district: userSource.district || "",
        sector: userSource.sector || "",
        cell: userSource.cell || "",
        village: userSource.village || "",
        address: userSource.address || "",
      });
    }
  }, [dbUser, session]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfileAction({
        userId: session?.user?.id,
        name: formData.name,
        phone: formData.phone || undefined,
        district: formData.district || undefined,
        sector: formData.sector || undefined,
        cell: formData.cell || undefined,
        village: formData.village || undefined,
        address: formData.address || undefined,
      });

      if (result) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        router.refresh();

        if (formData.district && document.referrer.includes('/cart')) {
          setTimeout(() => router.push('/cart'), 1000);
        }
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string, email: string) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase();
    return email ? email[0].toUpperCase() : 'U';
  };

  const getFullLocation = () => {
    const parts = [formData.village, formData.cell, formData.sector, formData.district].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : "No location set";
  };

  const isLocationComplete = () => {
    return formData.district && formData.sector && formData.cell && formData.village;
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-screen mt-20">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Please log in to view your profile.</p>
            <Button onClick={() => router.push('/login')} className="mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen mt-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and delivery location</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                      {getInitials(formData.name, formData.email)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{formData.name || "User"}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" /> {formData.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{formData.phone || "No phone number"}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span className="flex-1">{getFullLocation()}</span>
                </div>
                {!isLocationComplete() && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm font-medium">Location Incomplete</p>
                    <p className="text-amber-600 text-xs mt-1">
                      Complete your location details to enable food ordering
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/user/orders">Order History</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/cart">View Cart</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/user/menu">Browse Menu</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Edit Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+250 78 123 4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Location Details
                </CardTitle>
                <CardDescription>
                  Set your complete delivery location for accurate food delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="district">District <span className="text-red-500 ml-1">*</span></Label>
                    <Select value={formData.district} onValueChange={(v) => handleInputChange('district', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {rwandaDistricts.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector <span className="text-red-500 ml-1">*</span></Label>
                    <Input
                      id="sector"
                      value={formData.sector}
                      onChange={(e) => handleInputChange('sector', e.target.value)}
                      placeholder="Enter your sector"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cell">Cell <span className="text-red-500 ml-1">*</span></Label>
                    <Input
                      id="cell"
                      value={formData.cell}
                      onChange={(e) => handleInputChange('cell', e.target.value)}
                      placeholder="Enter your cell"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village">Village <span className="text-red-500 ml-1">*</span></Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => handleInputChange('village', e.target.value)}
                      placeholder="Enter your village"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Detailed Address (Optional)</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House number, street, building, landmarks..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-between items-center">
              <div>{isSaved && <p className="text-green-600 text-sm">Profile updated successfully!</p>}</div>
              <Button type="submit" disabled={isLoading || !isLocationComplete()} className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </div>

            {!isLocationComplete() && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">Complete Location Required</p>
                    <p className="text-sm text-amber-600">Please fill in all location fields (District, Sector, Cell, Village) to enable food ordering</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
