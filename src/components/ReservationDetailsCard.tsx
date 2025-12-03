"use client";

import {
  Calendar,
  Users,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Check,
  X,
  Bed,
  DollarSign,
  MoreVertical,
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
import { type HouseItem } from "@/config";
import { usePathname } from "next/navigation";
import { getCurrentProperty } from "@/lib/data";
import AddReservationDialog from "./AddReservationDialog";
import { updateReservationStatus } from "@/app/panel/[slug]/actions";

type Prop = { reservation: Reservation };

const ReservationDetailsCard = ({ reservation }: Prop) => {
  const pathname = usePathname();
  const { name, description, Icon, beds, price_per_night, facilities } =
    getCurrentProperty(pathname) as HouseItem;

  const {
    status,
    check_in,
    check_out,
    guests,
    nights,
    created_at,
    reservation_number,
    notes,
    adults,
    children,
    guest_id: { first_name, last_name, email, phone },
  } = reservation;

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      title="Edytuj"
      className="hover:bg-foreground cursor-pointer"
    >
      <MoreVertical className="h-5 w-5" />
    </Button>
  );

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
                  "pointer-events-none absolute -top-6 left-0 h-25 w-full rounded-t-xl bg-gradient-to-r to-transparent",
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
                    Utworzono: {formatCreatedAt(created_at)}
                  </CardDescription>
                </div>
                {/* Edycja rezerwacji */}
                <AddReservationDialog
                  reservation={reservation}
                  buttonTrigger={trigger}
                  variant={"edit"}
                />
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
                            {adults} dorosłych, {children} dzieci
                          </div>
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
                          <Icon />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 text-lg font-semibold">{name}</h4>
                          <p className="text-muted-foreground mb-3 text-sm">
                            {description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary" className="gap-1.5">
                              <Bed className="h-3 w-3" />
                              {beds} sypialnie
                            </Badge>
                            {facilities.map((el, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="gap-1.5"
                              >
                                <el.icon className="h-3 w-3" />
                                {el.name}
                              </Badge>
                            ))}
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

                <div className="flex gap-6">
                  <div className="space-y-4">
                    <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      Kontakt
                    </h3>
                    <div className="flex items-center justify-center">
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
                  {/* Adres */}
                  {/* <div className="space-y-4">
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
                  </div> */}
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
                          <span className="text-sm font-medium">Notatki</span>
                          {/* <span className="text-muted-foreground text-xs">
                            18 lis 2025, 14:32
                          </span> */}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {notes ? notes : "Brak notatek"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4" />
                Płatność
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Cena pokoju za noc
                </span>
                <span>{price_per_night} PLN</span>
              </div>
              {/* <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dodatkowe usługi</span>
                <span>280 PLN</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Opłata serwisowa</span>
                <span>100 PLN</span>
              </div> */}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Razem</span>
                <span className="text-xl font-bold">
                  {nights * price_per_night} PLN
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Akcje */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {status == "potwierdzony" ? null : (
                <form action={updateReservationStatus}>
                  <input type="hidden" name="status" value="potwierdzony" />
                  <input
                    type="hidden"
                    name="reservation_id"
                    value={reservation.id}
                  />
                  <Button className="w-full gap-2" size="lg">
                    <Check className="h-4 w-4" />
                    Zatwierdź rezerwację
                  </Button>
                </form>
              )}

              <Button variant="outline" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Wyślij wiadomość
              </Button>
              <form action={updateReservationStatus}>
                <input type="hidden" name="status" value="odrzucony" />
                <input
                  type="hidden"
                  name="reservation_id"
                  value={reservation.id}
                />
                <Button
                  variant="destructive"
                  type="submit"
                  className="w-full gap-2"
                >
                  <X className="h-4 w-4" />
                  Odrzuć rezerwację
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Historia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4" />
                Historia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                <div>
                  <div className="text-sm font-medium">
                    Rezerwacja utworzona
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {formatCreatedAt(created_at, true)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-muted mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                <div>
                  <div className="text-sm font-medium">
                    Email potwierdzenia wysłany
                  </div>
                  <div className="text-muted-foreground text-xs">
                    18 lis 2025, 14:33 ?
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsCard;
