import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MentorCard from "@/components/MentorCard";
import courseService, { IMentor } from "@/services/courseService";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MentorsPage = () => {
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<IMentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [specializationFilter, setSpecializationFilter] = useState<string>("all");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await courseService.getMentors();
        setMentors(data);
        setFilteredMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to fetch mentors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter values change
    let results = mentors;

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      results = results.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(search) ||
          mentor.specialization.toLowerCase().includes(search) ||
          mentor.bio.toLowerCase().includes(search)
      );
    }

    // Apply specialization filter
    if (specializationFilter !== "all") {
      results = results.filter(
        (mentor) => mentor.specialization.toLowerCase() === specializationFilter.toLowerCase()
      );
    }

    setFilteredMentors(results);
  }, [searchTerm, specializationFilter, mentors]);

  // Get unique specializations from mentors
  const specializations = [
    "all",
    ...new Set(mentors.map((mentor) => mentor.specialization)),
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Expert Mentors</h1>
        <p className="text-gray-600">
          Learn from industry professionals with years of experience
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="w-60">
          <Select
            value={specializationFilter}
            onValueChange={setSpecializationFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((specialization) => (
                <SelectItem key={specialization} value={specialization}>
                  {specialization === "all"
                    ? "All Specializations"
                    : specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No mentors found</h3>
          <p className="text-gray-500 mt-2">
            Try changing your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default MentorsPage; 