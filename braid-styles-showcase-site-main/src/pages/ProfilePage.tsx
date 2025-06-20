/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Mail, Phone, Save, Lock } from "lucide-react";
import { toast } from "react-toastify";

type UserProfile = {
  email: string;
  username: string;
  profile_image?: string;
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    username: "",
    profile_image: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });

  const token = localStorage.getItem("access_token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      toast.error("Could not load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!profile.username) {
      toast.error("Full name is required");
      return;
    }
    try {
      setUpdating(true);
      const res = await fetch("http://localhost:8000/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const updatePassword = async () => {
    if (!passwords.old_password || !passwords.new_password) {
      toast.error("Both password fields are required");
      return;
    }
  
    try {
      setChangingPassword(true);
      const res = await fetch("http://localhost:8000/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: passwords.old_password,
          new_password: passwords.new_password
        }),
      });
  
      const data = await res.json(); // Add this line to parse response
      
      if (!res.ok) {
        throw new Error(data.detail || "Password change failed");
      }
      
      toast.success("Password updated successfully!");
      setPasswords({ old_password: "", new_password: "" });
    } catch (err) {
      toast.error(err || "Failed to update password");
      console.error(err);
    } finally {
      setChangingPassword(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email"
              />
              <p className="text-xs text-muted-foreground">You can update your email directly</p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            {/* Profile Image URL */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Profile Image URL</Label>
              <Input
                value={profile.profile_image || ""}
                onChange={(e) => setProfile({ ...profile, profile_image: e.target.value })}
                placeholder="https://yourcdn.com/image.jpg"
              />
              {profile.profile_image && (
                <img
                  src={profile.profile_image}
                  alt="Profile Preview"
                  className="h-20 w-20 rounded-full border mt-2"
                />
              )}
            </div>

            <div className="pt-4">
              <Button onClick={updateProfile} disabled={updating} className="w-full sm:w-auto">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Old Password</Label>
            <Input
              type="password"
              value={passwords.old_password}
              onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
            />
          </div>
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              value={passwords.new_password}
              onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
            />
          </div>
          <Button onClick={updatePassword} disabled={changingPassword}>
            {changingPassword ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
