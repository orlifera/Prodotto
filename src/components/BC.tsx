import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { BCProps } from "@/types"

export default function BC({ currentPage }: BCProps) {
    return (
        <div className="w-[95%] m-auto flex items-baseline gap-2 justify-start">
            <p className="text-sm">Ti trovi in:</p>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-primary">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {currentPage && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="#"
                                    className="text-muted-foreground cursor-default pointer-events-none"
                                >
                                    {currentPage}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
