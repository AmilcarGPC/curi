"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search, AlertCircle, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample data for students by grade and regularity
const studentsByGrade = {
  "1st Grade": {
    regular: [
      { id: "STU010", name: "James Taylor", averageGrade: "B+", attendance: "93%" },
      { id: "STU005", name: "Sophia Williams", averageGrade: "A+", attendance: "99%" },
      { id: "STU013", name: "Charlotte Brown", averageGrade: "A-", attendance: "97%" },
      { id: "STU014", name: "William Davis", averageGrade: "B", attendance: "95%" },
    ],
    irregular: [{ id: "STU015", name: "Harper Wilson", averageGrade: "C-", attendance: "85%" }],
  },
  "2nd Grade": {
    regular: [
      { id: "STU003", name: "Olivia Martinez", averageGrade: "A-", attendance: "97%" },
      { id: "STU008", name: "Ethan Lee", averageGrade: "B+", attendance: "94%" },
      { id: "STU016", name: "Amelia Johnson", averageGrade: "A", attendance: "96%" },
    ],
    irregular: [
      { id: "STU017", name: "Lucas Garcia", averageGrade: "D+", attendance: "82%" },
      { id: "STU018", name: "Mia Rodriguez", averageGrade: "C", attendance: "88%" },
    ],
  },
  "3rd Grade": {
    regular: [
      { id: "STU001", name: "Alex Chen", averageGrade: "A", attendance: "98%" },
      { id: "STU006", name: "Liam Garcia", averageGrade: "B-", attendance: "90%" },
      { id: "STU011", name: "Mia Anderson", averageGrade: "A", attendance: "98%" },
      { id: "STU019", name: "Henry Thompson", averageGrade: "B+", attendance: "94%" },
    ],
    irregular: [{ id: "STU020", name: "Evelyn Martin", averageGrade: "D", attendance: "80%" }],
  },
  "4th Grade": {
    regular: [
      { id: "STU002", name: "Emma Wilson", averageGrade: "B+", attendance: "95%" },
      { id: "STU007", name: "Ava Rodriguez", averageGrade: "A", attendance: "96%" },
      { id: "STU012", name: "Benjamin Martin", averageGrade: "B", attendance: "91%" },
    ],
    irregular: [
      { id: "STU021", name: "Sebastian Clark", averageGrade: "C-", attendance: "84%" },
      { id: "STU022", name: "Scarlett Lewis", averageGrade: "D+", attendance: "83%" },
    ],
  },
  "5th Grade": {
    regular: [
      { id: "STU004", name: "Noah Johnson", averageGrade: "B", attendance: "92%" },
      { id: "STU009", name: "Isabella Brown", averageGrade: "A-", attendance: "97%" },
      { id: "STU023", name: "Jackson Moore", averageGrade: "B+", attendance: "93%" },
    ],
    irregular: [
      { id: "STU024", name: "Sofia Taylor", averageGrade: "C", attendance: "86%" },
      { id: "STU025", name: "Leo Adams", averageGrade: "D", attendance: "81%" },
    ],
  },
}

export function AlumnosRegularidad() {
  const [selectedGrade, setSelectedGrade] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedGrades, setExpandedGrades] = useState<string[]>(["1st Grade"])

  // Get all grades or filter by selected grade
  const getGradesToDisplay = () => {
    if (selectedGrade === "all") {
      return Object.keys(studentsByGrade)
    } else {
      return [selectedGrade]
    }
  }

  // Filter students by search term
  const filterStudents = (students: any[]) => {
    if (!searchTerm) return students
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Toggle expanded grade
  const toggleGrade = (grade: string) => {
    setExpandedGrades((prev) => (prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]))
  }

  // Get summary counts
  const getSummary = () => {
    let regularCount = 0
    let irregularCount = 0

    Object.values(studentsByGrade).forEach((gradeData) => {
      regularCount += gradeData.regular.length
      irregularCount += gradeData.irregular.length
    })

    return { regularCount, irregularCount, total: regularCount + irregularCount }
  }

  const summary = getSummary()
  const gradesToDisplay = getGradesToDisplay()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="1st Grade">1st Grade</SelectItem>
              <SelectItem value="2nd Grade">2nd Grade</SelectItem>
              <SelectItem value="3rd Grade">3rd Grade</SelectItem>
              <SelectItem value="4th Grade">4th Grade</SelectItem>
              <SelectItem value="5th Grade">5th Grade</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 focus-visible-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search students"
            />
          </div>
        </div>

        <Button variant="outline" size="sm" className="focus-visible-ring">
          <Download className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Regularity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success bg-opacity-20">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Regular Students</p>
                    <p className="text-2xl font-bold">{summary.regularCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((summary.regularCount / summary.total) * 100)}% of total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full  bg-opacity-20">
                    <AlertCircle className="h-6 w-6 text-danger" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Irregular Students</p>
                    <p className="text-2xl font-bold">{summary.irregularCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((summary.irregularCount / summary.total) * 100)}% of total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-20">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{summary.total}</p>
                    <p className="text-xs text-muted-foreground">Across all grades</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {gradesToDisplay.map((grade, index) => (
            <motion.div
              key={grade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Accordion
                type="single"
                collapsible
                value={expandedGrades.includes(grade) ? grade : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setExpandedGrades((prev) => [...prev, grade])
                  } else {
                    setExpandedGrades((prev) => prev.filter((g) => g !== grade))
                  }
                }}
              >
                <AccordionItem value={grade} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 focus-visible-ring">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{grade}</span>
                      <div className="flex gap-2">
                        <span className="badge-regular">
                          Regular: {studentsByGrade[grade as keyof typeof studentsByGrade].regular.length}
                        </span>
                        <span className="badge-irregular">
                          Irregular: {studentsByGrade[grade as keyof typeof studentsByGrade].irregular.length}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 py-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Regular Students
                      </h4>
                      <div className="space-y-2 mb-4">
                        {filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].regular).length > 0 ? (
                          filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].regular).map(
                            (student) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{student.name}</span>
                                  <span className="text-xs text-muted-foreground">({student.id})</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm">
                                    <span className="font-medium">{student.averageGrade}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-success">{student.attendance}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ),
                          )
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">No regular students found.</p>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-danger" />
                        Irregular Students
                      </h4>
                      <div className="space-y-2">
                        {filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].irregular).length > 0 ? (
                          filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].irregular).map(
                            (student) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-between p-2 rounded-md  bg-opacity-5 hover: hover:bg-opacity-10"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{student.name}</span>
                                  <span className="text-xs text-muted-foreground">({student.id})</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm">
                                    <span className="font-medium text-danger">{student.averageGrade}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-danger">{student.attendance}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ),
                          )
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">No irregular students found.</p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}