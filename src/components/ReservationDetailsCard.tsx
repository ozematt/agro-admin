"use client";

import {
  Calendar,
  Users,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Home,
  Check,
  X,
  MoreVertical,
  Bed,
  Wifi,
  Coffee,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatCheckInOut, formatCreatedAt } from "@/utils/helpers";
import { type Reservation } from "./ReservationViewer";

type Prop = { reservation: Reservation };

const ReservationDetailsCard = ({ reservation }: Prop) => {




  const {
    status,
    check_in,
    check_out,
    guests,
    nights,
    created_at,
    reservation_number,
    guest_id: { first_name, last_name, email, phone },
    property_id: { name, beds, price_per_night, facilities },
  } = reservation;

  return (
    <div className="h-screen max-h-[90vh] max-w-5xl overflow-y-auto">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Główna kolumna - lewa */}
        <div className="space-y-6 lg:col-span-2">
          {/* Główna karta z statusem */}
          <Card>
            {/* Header z statusem */}
            <CardHeader className="relative">
              <div
                className={cn(
                  "absolute -top-6 left-0 h-25 w-full rounded-t-xl bg-gradient-to-r to-transparent",
                  status === "oczekujący" &&
                    "from-chart-4/10 dark:from-chart-3/20",
                  status === "potwierdzony" &&
                    "dark:from-chart-2/20 from-chart-2/10",
                  status === "odrzucony" &&
                    "dark:from-destructive/20 from-destructive/10",
                )}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <CardTitle className="text-2xl">
                      Rezerwacja {reservation_number}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        status === "oczekujący" && "badge-pending",
                        status === "potwierdzony" && "badge-confirmed",
                        status === "odrzucony" && "badge-rejected",
                      )}
                    >
                      {status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatCreatedAt(created_at)}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Tabs */}
            <Tabs defaultValue="info" className="w-full">
              <div className="border-b px-6">
                <TabsList className="h-auto w-full justify-start bg-transparent p-0">
                  <TabsTrigger
                    value="info"
                    className="data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary cursor-pointer rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:shadow-none dark:border-none"
                  >
                    Informacje
                  </TabsTrigger>
                  <TabsTrigger
                    value="guest"
                    className="data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary cursor-pointer rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:shadow-none dark:border-none"
                  >
                    Gość
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary cursor-pointer rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:shadow-none dark:border-none"
                  >
                    Notatki
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Zawartość - Info */}
              <TabsContent value="info" className="mt-0 space-y-6 p-6">
                {/* Daty i pobyt */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      Termin pobytu
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                        <div>
                          <div className="font-medium">Check-in</div>
                          <div className="text-muted-foreground text-sm">
                            {formatCheckInOut(check_in)}
                          </div>
                          <div className="text-muted-foreground mt-1 text-xs">
                            Po godzinie 15:00
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                        <div>
                          <div className="font-medium">Check-out</div>
                          <div className="text-muted-foreground text-sm">
                            {formatCheckInOut(check_out)}
                          </div>
                          <div className="text-muted-foreground mt-1 text-xs">
                            Do godziny 11:00
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Długość pobytu
                        </span>
                        <span className="font-medium">{nights} noce</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      Goście
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="text-muted-foreground mt-0.5 h-5 w-5" />
                        <div>
                          <div className="font-medium">{guests} osoby</div>
                          <div className="text-muted-foreground text-sm">
                            2 dorosłych, 2 dzieci ?
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Dorosłych
                          </span>
                          <span>2</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Dzieci (0-12 lat)
                          </span>
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pokój */}
                <div>
                  <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                    Pokój
                  </h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-muted flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg">
                          <Home className="text-muted-foreground h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 text-lg font-semibold">{name}</h4>
                          <p className="text-muted-foreground mb-3 text-sm">
                            Przestronny apartament z widokiem na góry
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary" className="gap-1.5">
                              <Bed className="h-3 w-3" />
                              {beds}sypialnie
                            </Badge>
                            <Badge variant="secondary" className="gap-1.5">
                              <Wifi className="h-3 w-3" />
                              WiFi
                            </Badge>
                            <Badge variant="secondary" className="gap-1.5">
                              <Coffee className="h-3 w-3" />
                              Kuchnia
                            </Badge>
                            <Badge variant="secondary" className="gap-1.5">
                              <Tv className="h-3 w-3" />
                              TV
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Zawartość - Gość */}
              <TabsContent value="guest" className="mt-0 space-y-6 p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">JN</AvatarFallback>
                  </Avatar>

                  <h2 className="mb-1 text-2xl font-bold">
                    {first_name} {last_name}
                  </h2>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      Kontakt
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="link"
                        className="text-foreground h-auto justify-start gap-3 p-0"
                      >
                        <Mail className="text-muted-foreground h-5 w-5" />
                        {email}
                      </Button>
                      <Button
                        variant="link"
                        className="text-foreground h-auto justify-start gap-3 p-0"
                      >
                        <Phone className="text-muted-foreground h-5 w-5" />
                        {phone}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      Adres
                    </h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-muted-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                      <div className="text-sm">
                        <div>ul. Przykładowa 123</div>
                        <div>00-001 Warszawa</div>
                        <div>Polska</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Zawartość - Notatki */}
              <TabsContent value="notes" className="mt-0 space-y-4 p-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Notatka od gościa
                          </span>
                          <span className="text-muted-foreground text-xs">
                            18 lis 2025, 14:32
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Proszę o przygotowanie łóżeczka dziecięcego oraz
                          wysokiego krzesełka. Planujemy przyjazd około godziny
                          18:00.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* <Alert className="bg-emerald-500/5 border-emerald-500/20">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 bg-emerald-500/20">
                        <AvatarFallback className="text-emerald-600 dark:text-emerald-400 text-xs">AK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Wewnętrzna notatka (Anna K.)</span>
                          <span className="text-xs text-muted-foreground">20 lis 2025, 10:15</span>
                        </div>
                        <AlertDescription>
                          Potwierdzono późny check-in. Pokój 205 przygotowany z łóżeczkiem dziecięcym 
                          i dodatkowym wyposażeniem. Przekazano informacje do zespołu recepcji.
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert> */}

                <Separator />

                <div className="space-y-2">
                  <Textarea
                    placeholder="Dodaj nową notatkę..."
                    className="resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button>Dodaj notatkę</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Prawa kolumna - Podsumowanie */}
        <div className="space-y-6">
          {/* Akcje */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2" size="lg">
                <Check className="h-4 w-4" />
                Zatwierdź rezerwację
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Wyślij wiadomość
              </Button>
              <Button variant="destructive" className="w-full gap-2">
                <X className="h-4 w-4" />
                Odrzuć rezerwację
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsCard;
