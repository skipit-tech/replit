import { Card } from "@/components/ui/card"

type SelfSootheSkillCardProps = {
  title: string
  description: string
  variant?: "default" | "compact"
}

export function SelfSootheSkillCard({
  title,
  description,
  variant = "default",
}: SelfSootheSkillCardProps) {
  return (
    <Card
      className={`${
        variant === "compact" ? "p-4" : "p-6"
      } bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-shadow`}
    >
      <h3
        className={`${
          variant === "compact" ? "text-base" : "text-lg"
        } font-semibold text-gray-900 dark:text-white mb-2`}
      >
        {title}
      </h3>
      <p
        className={`${
          variant === "compact" ? "text-sm" : "text-base"
        } text-gray-700 dark:text-gray-300 leading-relaxed`}
      >
        {description}
      </p>
    </Card>
  )
}
