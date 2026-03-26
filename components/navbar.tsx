"use client"

import Link from "next/link"
import React from "react"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import ThemeToggle from "@/components/ThemeToggle"

const navItems = ["Home", "Services", "Projects", "Contact", "Blogs", "Skills"]

export default function Navbar() {
    const [open, setOpen] = React.useState(false)

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                        <Link href="/" className="font-[family:var(--font-display)] text-lg font-semibold tracking-tight">
                            Astitva
                        </Link>
                        <p className="hidden text-xs text-muted-foreground sm:block">
                            Full-stack developer
                        </p>
                    </div>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 shadow-sm backdrop-blur">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                                >
                                    {item}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-border/70 bg-background/95">
                            <div className="mt-10 flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="rounded-2xl border border-border/60 px-4 py-3 text-base font-medium text-foreground transition hover:bg-accent"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
