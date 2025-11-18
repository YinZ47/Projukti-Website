// data/timelinePosts.ts
export type TimelinePost = {
  id: number
  profileImage: string
  name: string
  day: string
  description: string
  images: string[]
}

export const timelinePosts: TimelinePost[] = [
  {
    id: 1,
    profileImage: "/images/projukti-lipi-logo.png",
    name: "Projukti Lipi",
    day: "2w",
    description: `Drishtikon Progress Update – Week 3

This week, we achieved a major milestone in developing the ocular system for Drishtikon, advancing further toward the first fully expressive humanoid endoskeleton at Projukti Lipi.

Key progress includes:

* Completing the full circuit of the ocular system

* Developing a master control code using the serial monitor for autonomous eye movement

* Implementing preprogrammed gestures to simulate realistic human eye behaviour, closely mirroring actual eye muscles

This allows us to demonstrate how the eyes can move, blink, and respond in a natural, lifelike manner, setting a strong foundation for expressive humanoid interaction.

Team members this week:
Ahnaf Ashique Adi, Sadman Labib Eram, and Saad Bin Ahsan Khan

Every step brings Drishtikon closer to a system that can genuinely connect and express emotion, making robotics more relatable and realistic.

#ProjuktiLipi #Drishtikon #Robotics #Innovation`,
    images: [
      "/images/timeline/1-0.jpg",
      "/images/timeline/1-1.jpeg",
      "/images/timeline/1-2.jpeg",
      "/images/timeline/1-3.jpeg",
    ],
  },
  {
    id: 2,
    profileImage: "/images/projukti-lipi-logo.png",
    name: "Projukti Lipi",
    day: "3w",
    description: `Drishtikon Progress Update – Week 2

On 21 August 2025, our second lab session for Drishtikon marked another step forward in building the first fully expressive humanoid endoskeleton at Projukti Lipi.

This week's progress included:

1. Printing the front eye STL parts along with the base and the long linkage piece that drives motion
2. Completing the tuning of the remaining servos
3. Attempting the first blink test for the eyes

Each milestone brings us closer to achieving natural eye movement, realistic blinking, and a system capable of genuine expression. The foundation we are building now will shape how Drishtikon connects and communicates in the future.

Team members in frame this week:
Ahnaf Ashique Adi, Neamul Pial, Sadman Labib Eram, and Ahnaf Sahaf

With steady effort and clear vision, Drishtikon continues to move from concept to creation.

#ProjuktiLipi #Drishtikon #Robotics #Innovation`,
    images: [
      "/images/timeline/2-0.jpeg",
      "/images/timeline/2-1.jpeg",
      "/images/timeline/2-2.jpeg",
      "/images/timeline/2-3.jpeg",
      "/images/timeline/2-4.jpeg",
    ],
  },
  {
    id: 3,
    profileImage: "/images/projukti-lipi-logo.png",
    name: "Projukti Lipi",
    day: "3w",
    description: `Drishtikon Progress Update – Week 1
On 12 August 2025, we officially began our first lab session for Drishtikon, our dream project at Projukti Lipi, where we are working to build the country's first fully expressive humanoid endoskeleton.
In this opening week, our focus was on laying the foundation for the ocular system, the starting point of human expression. Key progress included:
* Printed the initial STL parts for the eye mechanism
* Assembled the basic structure
* Tuned and tested two servo motors for movement and response
This marks the beginning of a long journey ahead. Still, every detail matters as we work to replicate natural eye movement, realistic blinking, and pupil tracking, setting the stage for a humanoid that can connect through eye contact.
Team members in frame this week:
Ahnaf Ashique Adi, Mahir Dyan, Sadman Labib Eram
With passion, precision, and collaboration, Drishtikon is steadily moving from vision to reality.
#ProjuktiLipi #Drishtikon #Robotics #Innovation`,
    images: [
      "/images/timeline/3-0.jpg",
      "/images/timeline/3-1.jpeg",
      "/images/timeline/3-2.jpeg",
      "/images/timeline/3-3.jpeg",
      "https://media.licdn.com/dms/image/v2/D5622AQEnKnyruRjRBw/feedshare-shrink_1280/B56ZkBE641H8As-/0/1756659693951?e=1761782400&v=beta&t=Iz3sbVyXWuez-BtPDirtGtJVs-V7zQfA5PKq74-nwgw",
    ],
  },
]
