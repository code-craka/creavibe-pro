"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, FileJson, FileSpreadsheet, FileText, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Define interfaces for better type safety
interface DataType {
  id: string;
  label: string;
  count: number;
}

interface ExportFormat {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface ExportRecord {
  id: string;
  date: Date;
  format: string;
  size: string;
}

// Mock data types for export
const dataTypes: DataType[] = [
  { id: "projects", label: "Projects", count: 24 },
  { id: "templates", label: "Templates", count: 15 },
  { id: "content", label: "Content", count: 87 },
  { id: "images", label: "Generated Images", count: 42 },
  { id: "videos", label: "Video Scripts", count: 13 },
  { id: "analytics", label: "Analytics Data", count: 156 },
]

// Export format options
const exportFormats: ExportFormat[] = [
  { id: "json", label: "JSON", icon: FileJson },
  { id: "csv", label: "CSV", icon: FileText },
  { id: "xlsx", label: "Excel (XLSX)", icon: FileSpreadsheet },
]

export function DataExportSettings() {
  const { toast } = useToast()
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("json")
  // Local DateRange type that matches our state
  type DateRange = { from: Date | undefined; to: Date | undefined }
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [recentExports, setRecentExports] = useState<Array<{ id: string; date: Date; format: string; size: string }>>([
    { id: "exp-123", date: new Date(2023, 4, 15), format: "JSON", size: "2.4 MB" },
    { id: "exp-122", date: new Date(2023, 3, 28), format: "CSV", size: "1.8 MB" },
  ])

  const handleDataTypeToggle = (dataTypeId: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(dataTypeId) ? prev.filter((id) => id !== dataTypeId) : [...prev, dataTypeId],
    )
  }

  const handleSelectAll = () => {
    if (selectedDataTypes.length === dataTypes.length) {
      setSelectedDataTypes([])
    } else {
      setSelectedDataTypes(dataTypes.map((type) => type.id))
    }
  }

  const handleExport = () => {
    if (selectedDataTypes.length === 0) {
      toast({
        title: "No data selected",
        description: "Please select at least one data type to export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    setExportProgress(0)

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)

          // Add to recent exports
          const newExport = {
            id: `exp-${Math.floor(Math.random() * 1000)}`,
            date: new Date(),
            format: exportFormats.find((f) => f.id === exportFormat)?.label || exportFormat.toUpperCase(),
            size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
          }

          setRecentExports((prev) => [newExport, ...prev])

          toast({
            title: "Export complete",
            description: `Your data has been exported successfully in ${exportFormat.toUpperCase()} format.`,
          })

          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }

  const totalItems = dataTypes
    .filter((type) => selectedDataTypes.includes(type.id))
    .reduce((sum, type) => sum + type.count, 0)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Export your data in various formats. Select the data types and format you want to export.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Select Data to Export</h3>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedDataTypes.length === dataTypes.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataTypes.map((dataType) => (
                <div
                  key={dataType.id}
                  className="flex items-center space-x-3 border rounded-md p-3 hover:bg-accent transition-colors"
                >
                  <Checkbox
                    id={`data-type-${dataType.id}`}
                    checked={selectedDataTypes.includes(dataType.id)}
                    onCheckedChange={() => handleDataTypeToggle(dataType.id)}
                  />
                  <Label
                    htmlFor={`data-type-${dataType.id}`}
                    className="flex-1 flex justify-between items-center cursor-pointer"
                  >
                    <span>{dataType.label}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{dataType.count} items</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Date Range (Optional)</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date-range">Select date range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-range"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>All time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range) {
                          setDateRange({
                            from: range.from,
                            to: range.to,
                          });
                        } else {
                          setDateRange({ from: undefined, to: undefined });
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                variant="ghost"
                className="h-10 px-3 self-end"
                onClick={() => setDateRange({ from: undefined, to: undefined })}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Export Format Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Export Format</h3>
            <RadioGroup
              defaultValue="json"
              value={exportFormat}
              onValueChange={setExportFormat}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {exportFormats.map((format) => {
                const Icon = format.icon
                return (
                  <div key={format.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={format.id} id={`format-${format.id}`} />
                    <Label htmlFor={`format-${format.id}`} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4" />
                      <span>{format.label}</span>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exporting data...</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {selectedDataTypes.length > 0
              ? `${selectedDataTypes.length} data types selected (${totalItems} items total)`
              : "No data selected"}
          </div>
          <Button onClick={handleExport} disabled={isExporting || selectedDataTypes.length === 0}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your recently exported data files</CardDescription>
        </CardHeader>
        <CardContent>
          {recentExports.length > 0 ? (
            <div className="space-y-4">
              {recentExports.map((export_) => (
                <div
                  key={export_.id}
                  className="flex items-center justify-between border rounded-md p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">Data Export {export_.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(export_.date, "PPP")} • {export_.format} • {export_.size}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No recent exports</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Limits Info */}
      <Alert>
        <AlertTitle>Export Limits</AlertTitle>
        <AlertDescription>
          Free accounts can export up to 1,000 items per month. Upgrade to a premium plan for unlimited exports.
        </AlertDescription>
      </Alert>
    </div>
  )
}
