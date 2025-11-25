import {
  Calendar,
  Users,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  MessageSquare,
  Clock,
  DollarSign,
  Home,
  Check,
  X,
  ChevronLeft,
  Edit,
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
// import { Alert, AlertDescription } from '@/components/ui/alert';

const ReservationDetailsCard = () => {
  return (
    <div className="h-screen max-h-[90vh] max-w-5xl overflow-y-auto">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Główna kolumna - lewa */}
        <div className="space-y-6 lg:col-span-2">
          {/* Główna karta z statusem */}
          <Card>
            {/* Header z statusem */}
            <CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <CardTitle className="text-2xl">
                      Rezerwacja #R2025-1121
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    >
                      Oczekujący
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Utworzono: 18 listopada 2025, 14:32
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
                    className="data-[state=active]:border-primary rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Informacje
                  </TabsTrigger>
                  <TabsTrigger
                    value="guest"
                    className="data-[state=active]:border-primary rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Gość
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:border-primary rounded-none px-4 py-4 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                            21 listopada 2025, piątek
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
                            23 listopada 2025, niedziela
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
                        <span className="font-medium">2 noce</span>
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
                          <div className="font-medium">4 osoby</div>
                          <div className="text-muted-foreground text-sm">
                            2 dorosłych, 2 dzieci
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
                          <h4 className="mb-1 text-lg font-semibold">
                            Apartament Rodzinny
                          </h4>
                          <p className="text-muted-foreground mb-3 text-sm">
                            Przestronny apartament z widokiem na góry
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary" className="gap-1.5">
                              <Bed className="h-3 w-3" />2 sypialnie
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

                <Separator />

                {/* Dodatki */}
                <div>
                  <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                    Dodatkowe usługi
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">
                        Śniadanie (4 osoby × 2 dni)
                      </span>
                      <span className="font-medium">240 PLN</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Parking</span>
                      <span className="font-medium">40 PLN</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Zawartość - Gość */}
              <TabsContent value="guest" className="mt-0 space-y-6 p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">JN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="mb-1 text-2xl font-bold">Jan Nowak</h2>
                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        Zweryfikowany
                      </Badge>
                      <span>•</span>
                      <span>5 poprzednich pobytów</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-5 w-5" />
                  </Button>
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
                        jan.nowak@example.com
                      </Button>
                      <Button
                        variant="link"
                        className="text-foreground h-auto justify-start gap-3 p-0"
                      >
                        <Phone className="text-muted-foreground h-5 w-5" />
                        +48 123 456 789
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

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                    Preferencje
                  </h3>
                  {/* <Alert>
                      <AlertDescription>
                        Preferuje pokoje na wyższych piętrach z widokiem. Alergik na orzechy. 
                        Potrzebuje łóżeczka dziecięcego.
                      </AlertDescription>
                    </Alert> */}
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
          {/* Płatność */}
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
                  Cena pokoju (2 noce)
                </span>
                <span>1,200 PLN</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dodatkowe usługi</span>
                <span>280 PLN</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Opłata serwisowa</span>
                <span>100 PLN</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Razem</span>
                <span className="text-xl font-bold">1,580 PLN</span>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4" />
                  <span>Status płatności</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                >
                  Oczekuje na wpłatę
                </Badge>
              </div>
            </CardContent>
          </Card>

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
                    18 lis 2025, 14:32
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
                    18 lis 2025, 14:33
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
