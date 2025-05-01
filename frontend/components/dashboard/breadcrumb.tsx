import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  title: string
  href: string
}

interface DashboardBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function DashboardBreadcrumb({ items }: DashboardBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/dashboard" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            <Link
              href={item.href}
              className={index === items.length - 1 ? "font-medium text-foreground" : "hover:text-foreground"}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
