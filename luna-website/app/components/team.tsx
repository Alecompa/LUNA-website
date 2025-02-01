import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  { id: 1, name: "Dr. Jane Smith", role: "Lead Researcher", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Prof. John Doe", role: "Senior Scientist", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Dr. Emily Brown", role: "Data Analyst", avatar: "/placeholder.svg?height=100&width=100" },
]

export default function Team() {
  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

