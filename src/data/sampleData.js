// Sample blog data for testing
export const sampleBlogs = [
  {
    id: 1699123456789,
    title: "WPC Telangana State Championship 2024 Results",
    content: `The WPC Telangana State Championship 2024 concluded with record-breaking performances from athletes across all categories. The championship saw participation from over 200 powerlifters from across the state.

    **Highlights:**
    - Men's Open: New state record in deadlift (350kg)
    - Women's Open: Exceptional performance in bench press
    - Junior categories showed promising talent

    The championship was held following international WPC regulations with certified judges and equipment. All lifts were thoroughly verified and recorded for future reference.

    We congratulate all participants for their dedication and sportsmanship. The next state championship is scheduled for March 2025.`,
    excerpt: "The WPC Telangana State Championship 2024 concluded with record-breaking performances from athletes across all categories.",
    featuredImage: "/images/gallery/gallery-1-1.jpg",
    category: "Competition",
    tags: "championship, competition, results, powerlifting",
    published: true,
    createdAt: "2024-11-01T10:30:00.000Z",
    updatedAt: "2024-11-01T10:30:00.000Z",
    author: "WPC Telangana Admin"
  },
  {
    id: 1699123556789,
    title: "Training Tips for Beginner Powerlifters",
    content: `Starting your powerlifting journey can be overwhelming, but with the right approach, you can build a strong foundation for success.

    **Essential Tips for Beginners:**
    
    1. **Master the Big Three**: Focus on squat, bench press, and deadlift
    2. **Start Light**: Begin with weights you can handle with perfect form
    3. **Progressive Overload**: Gradually increase weight over time
    4. **Recovery is Key**: Allow adequate rest between training sessions
    5. **Seek Guidance**: Work with experienced coaches

    **Training Schedule:**
    - 3-4 days per week for beginners
    - Focus on compound movements
    - Include accessory exercises
    - Track your progress

    Remember, consistency beats intensity when you're starting out. Build habits that will serve you for years to come.`,
    excerpt: "Starting your powerlifting journey can be overwhelming, but with the right approach, you can build a strong foundation for success.",
    featuredImage: "/images/gallery/gallery-1-2.jpg",
    category: "Training",
    tags: "training, beginners, powerlifting, tips",
    published: true,
    createdAt: "2024-10-28T14:15:00.000Z",
    updatedAt: "2024-10-28T14:15:00.000Z",
    author: "WPC Telangana Admin"
  },
  {
    id: 1699123656789,
    title: "Upcoming WPC India National Championship",
    content: `The WPC India National Championship is scheduled for December 2024 in Mumbai. This prestigious event will bring together the best powerlifters from across India.

    **Event Details:**
    - Date: December 15-17, 2024
    - Venue: Mumbai Sports Complex
    - Categories: All age groups and weight classes
    - Registration deadline: November 30, 2024

    **Qualification Criteria:**
    Athletes must have participated in their respective state championships and achieved qualifying totals.

    **What to Expect:**
    - International standard equipment
    - Certified WPC judges
    - Drug testing protocols
    - Live streaming of the event

    Telangana athletes have been training hard and we expect strong representation at the nationals. Best of luck to all our qualified lifters!`,
    excerpt: "The WPC India National Championship is scheduled for December 2024 in Mumbai, bringing together the best powerlifters from across India.",
    featuredImage: "/images/gallery/gallery-1-3.jpg",
    category: "Events",
    tags: "nationals, championship, WPC India, competition",
    published: true,
    createdAt: "2024-10-25T09:45:00.000Z",
    updatedAt: "2024-10-25T09:45:00.000Z",
    author: "WPC Telangana Admin"
  }
];

// Function to seed sample data
export const seedSampleData = () => {
  // Only seed if no data exists
  const existingBlogs = localStorage.getItem('wpc_blogs');
  
  if (!existingBlogs) {
    localStorage.setItem('wpc_blogs', JSON.stringify(sampleBlogs));
    console.log('Sample blogs seeded successfully');
  }
};