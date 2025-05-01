import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for recent activity
const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "agregó una nueva calificación",
    subject: "Examen de Matemáticas",
    student: "Alex Chen",
    time: "hace 2 horas",
  },
  {
    id: 2,
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    action: "actualizó",
    subject: "Proyecto de Ciencias",
    student: "Emma Wilson",
    time: "hace 4 horas",
  },
  {
    id: 3,
    user: {
      name: "David Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DL",
    },
    action: "agregó una nueva calificación",
    subject: "Ensayo de Inglés",
    student: "Olivia Martinez",
    time: "Ayer",
  },
  {
    id: 4,
    user: {
      name: "Jennifer Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JT",
    },
    action: "actualizó",
    subject: "Examen de Historia",
    student: "Noah Johnson",
    time: "Ayer",
  },
  {
    id: 5,
    user: {
      name: "Robert Garcia",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RG",
    },
    action: "agregó una nueva calificación",
    subject: "Proyecto de Arte",
    student: "Sophia Williams",
    time: "hace 2 días",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} {activity.action} <span className="font-semibold">{activity.subject}</span> para{" "}
              <span className="font-semibold">{activity.student}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
