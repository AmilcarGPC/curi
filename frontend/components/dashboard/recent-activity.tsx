import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for recent activity
const activities = [
	{
		id: 1,
		user: {
			name: "Sara Jiménez",
			avatar: "/placeholder.svg?height=32&width=32",
			initials: "SJ",
		},
		action: "agregó una nueva calificación",
		subject: "Examen de Matemáticas",
		student: "Alejandro Chávez",
		time: "hace 2 horas",
	},
	{
		id: 2,
		user: {
			name: "Miguel Bravo",
			avatar: "/placeholder.svg?height=32&width=32",
			initials: "MB",
		},
		action: "actualizó",
		subject: "Proyecto de Ciencias",
		student: "Emilia García",
		time: "hace 4 horas",
	},
	{
		id: 3,
		user: {
			name: "David López",
			avatar: "/placeholder.svg?height=32&width=32",
			initials: "DL",
		},
		action: "agregó una nueva calificación",
		subject: "Ensayo de Inglés",
		student: "Olivia Martínez",
		time: "Ayer",
	},
	{
		id: 4,
		user: {
			name: "Jennifer Torres",
			avatar: "/placeholder.svg?height=32&width=32",
			initials: "JT",
		},
		action: "actualizó",
		subject: "Examen de Historia",
		student: "Noé Jiménez",
		time: "Ayer",
	},
	{
		id: 5,
		user: {
			name: "Roberto García",
			avatar: "/placeholder.svg?height=32&width=32",
			initials: "RG",
		},
		action: "agregó una nueva calificación",
		subject: "Proyecto de Arte",
		student: "Sofía Villalobos",
		time: "hace 2 días",
	},
]

export function RecentActivity() {
	return (
		<div className="space-y-8">
			{activities.map((activity) => (
				<div key={activity.id} className="flex items-start gap-4">
					<Avatar className="h-9 w-9">
						<AvatarImage
							src={activity.user.avatar || "/placeholder.svg"}
							alt={activity.user.name}
						/>
						<AvatarFallback>{activity.user.initials}</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">
							{activity.user.name} {activity.action}{" "}
							<span className="font-semibold">{activity.subject}</span> para{" "}
							<span className="font-semibold">{activity.student}</span>
						</p>
						<p className="text-sm text-muted-foreground">
							{activity.time}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
