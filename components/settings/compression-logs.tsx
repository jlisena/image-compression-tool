"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CompressionLog {
  fileId: string;
  fileName: string;
  logs: LogEntry[];
}

export interface LogEntry {
  operation: string;
  details: string;
}

interface CompressionLogsProps {
  logs: CompressionLog[];
}

export function CompressionLogs({ logs }: CompressionLogsProps) {
  if (logs.length === 0) {
    return (
      <Accordion type="single" collapsible defaultValue="">
        <AccordionItem value="logs">
          <AccordionTrigger className="text-sm font-medium">
            Compression Logs
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="text-xs text-muted-foreground">
              No images processed yet. Logs will appear here after compression.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="">
      <AccordionItem value="logs">
        <AccordionTrigger className="text-sm font-medium">
          Compression Logs
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.fileId} className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">
                  {log.fileName}
                </div>
                <div className="border rounded-md overflow-hidden">
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="h-8 py-1 px-3 text-left font-semibold text-foreground w-1/5">
                          Operation
                        </TableHead>
                        <TableHead className="h-8 py-1 px-3 text-left font-semibold text-foreground">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {log.logs.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                          <TableCell
                            colSpan={2}
                            className="py-2 px-3 text-xs text-muted-foreground text-center"
                          >
                            Standard compression applied
                          </TableCell>
                        </TableRow>
                      ) : (
                        log.logs.map((entry, idx) => (
                          <TableRow key={idx} className="hover:bg-muted/50">
                            <TableCell className="py-2 px-3 align-top">
                              {entry.operation}
                            </TableCell>
                            <TableCell className="py-2 px-3 align-top">
                              {entry.details}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
