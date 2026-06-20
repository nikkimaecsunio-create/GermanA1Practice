import { useState, useEffect, useCallback } from "react";

// ─── PALETTE ───────────────────────────────────────────────
const C = {
  bg: "#0b0b12", card: "#14141f", border: "#22223a",
  gold: "#f0c040", gold2: "#f8d97a", green: "#3ddba0",
  blue: "#5aaeff", red: "#ff5a5a", purple: "#b06aff",
  text: "#e8e8f4", muted: "#6b6b8a", dark: "#0f0f1a",
};

// ─── DATA ──────────────────────────────────────────────────
const WEEKS = [
  {
    id:1, phase:1, name:"Hallo! Greetings & Alphabet", topics:"Alphabet · Greetings · Numbers 1–20",
    vocab:[
      {de:"Hallo",en:"Hello",art:""},
      {de:"Guten Morgen",en:"Good morning",art:""},
      {de:"Guten Tag",en:"Good day",art:""},
      {de:"Guten Abend",en:"Good evening",art:""},
      {de:"Auf Wiedersehen",en:"Goodbye",art:""},
      {de:"Tschüss",en:"Bye (informal)",art:""},
      {de:"Bitte",en:"Please / You're welcome",art:""},
      {de:"Danke",en:"Thank you",art:""},
      {de:"Ja / Nein",en:"Yes / No",art:""},
      {de:"Entschuldigung",en:"Excuse me / Sorry",art:""},
      {de:"Wie geht es Ihnen?",en:"How are you? (formal)",art:""},
      {de:"Wie geht's?",en:"How are you? (informal)",art:""},
      {de:"Gut, danke",en:"Good, thank you",art:""},
      {de:"Mein Name ist...",en:"My name is...",art:""},
      {de:"Ich heiße...",en:"I am called...",art:""},
    ],
    grammar:[
      {rule:"sein (to be)",ex:"Ich bin · du bist · er/sie ist · wir sind",tr:"I am · you are · he/she is · we are"},
      {rule:"Personal Pronouns",ex:"ich · du · er · sie · es · wir · ihr · sie · Sie",tr:"I · you · he · she · it · we · y'all · they · You(formal)"},
      {rule:"Intro question",ex:"Wie heißen Sie? → Ich heiße Anna.",tr:"What's your name? → I'm Anna."},
    ],
    quiz:[
      {q:"How do you say 'Good morning'?",opts:["Guten Morgen","Guten Abend","Auf Wiedersehen","Tschüss"],ans:0},
      {q:"Formal 'How are you?'",opts:["Wie geht's?","Tschüss","Wie geht es Ihnen?","Danke"],ans:2},
      {q:"'Ich bin' means:",opts:["I have","I am","I want","I go"],ans:1},
    ],
    dialogue:[
      {s:"A",de:"Hallo! Wie heißen Sie?",en:"Hello! What is your name?"},
      {s:"B",de:"Ich heiße Thomas. Und Sie?",en:"I'm Thomas. And you?"},
      {s:"A",de:"Mein Name ist Anna. Wie geht es Ihnen?",en:"My name is Anna. How are you?"},
      {s:"B",de:"Gut, danke! Auf Wiedersehen!",en:"Good, thanks! Goodbye!"},
    ],
  },
  {
    id:2, phase:1, name:"Ich und Du — Introductions", topics:"Professions · Countries · Numbers 21–100",
    vocab:[
      {de:"der Lehrer / die Lehrerin",en:"teacher (m/f)",art:"der/die"},
      {de:"der Arzt / die Ärztin",en:"doctor (m/f)",art:"der/die"},
      {de:"der Student / die Studentin",en:"student (m/f)",art:"der/die"},
      {de:"Deutschland",en:"Germany",art:""},
      {de:"Österreich",en:"Austria",art:""},
      {de:"die Schweiz",en:"Switzerland",art:"die"},
      {de:"Indien",en:"India",art:""},
      {de:"kommen aus",en:"to come from",art:""},
      {de:"wohnen",en:"to live (reside)",art:""},
      {de:"sprechen",en:"to speak",art:""},
      {de:"alt / jung",en:"old / young",art:""},
      {de:"Wie alt bist du?",en:"How old are you?",art:""},
      {de:"Ich bin 25 Jahre alt.",en:"I am 25 years old.",art:""},
      {de:"von Beruf",en:"by profession",art:""},
      {de:"Was sind Sie von Beruf?",en:"What do you do?",art:""},
    ],
    grammar:[
      {rule:"kommen (to come)",ex:"Ich komme aus Indien. Er kommt aus Deutschland.",tr:"I come from India. He comes from Germany."},
      {rule:"der / die / das",ex:"der Mann · die Frau · das Kind",tr:"the man (m) · the woman (f) · the child (n)"},
      {rule:"Asking age",ex:"Wie alt bist du? → Ich bin 25 Jahre alt.",tr:"How old are you? → I am 25 years old."},
    ],
    quiz:[
      {q:"'der Arzt' means:",opts:["teacher","doctor","student","nurse"],ans:1},
      {q:"Article for 'Frau' (woman)?",opts:["der","das","die","ein"],ans:2},
      {q:"'Ich komme aus Indien' means:",opts:["I live in India","I speak Indian","I come from India","I like India"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Woher kommen Sie?",en:"Where are you from?"},
      {s:"B",de:"Ich komme aus Indien. Und Sie?",en:"I come from India. And you?"},
      {s:"A",de:"Ich bin aus Deutschland. Was sind Sie von Beruf?",en:"I'm from Germany. What do you do?"},
      {s:"B",de:"Ich bin Student. Und Sie?",en:"I'm a student. And you?"},
      {s:"A",de:"Ich bin Lehrerin.",en:"I'm a teacher."},
    ],
  },
  {
    id:3, phase:1, name:"Die Familie — Family", topics:"Family members · haben · Possessives",
    vocab:[
      {de:"die Familie",en:"the family",art:"die"},
      {de:"der Vater",en:"father",art:"der"},
      {de:"die Mutter",en:"mother",art:"die"},
      {de:"der Bruder",en:"brother",art:"der"},
      {de:"die Schwester",en:"sister",art:"die"},
      {de:"der Sohn",en:"son",art:"der"},
      {de:"die Tochter",en:"daughter",art:"die"},
      {de:"der Großvater",en:"grandfather",art:"der"},
      {de:"die Großmutter",en:"grandmother",art:"die"},
      {de:"der Onkel / die Tante",en:"uncle / aunt",art:""},
      {de:"das Kind",en:"child",art:"das"},
      {de:"verheiratet / ledig",en:"married / single",art:""},
      {de:"mein / meine",en:"my (m/n) / my (f)",art:""},
      {de:"Hast du Geschwister?",en:"Do you have siblings?",art:""},
      {de:"Ich habe einen Bruder.",en:"I have a brother.",art:""},
    ],
    grammar:[
      {rule:"haben (to have)",ex:"Ich habe · du hast · er/sie hat · wir haben",tr:"I have · you have · he/she has · we have"},
      {rule:"Possessive mein/meine",ex:"mein Vater (m) · meine Mutter (f) · mein Kind (n)",tr:"my father · my mother · my child"},
      {rule:"Indefinite article",ex:"ein Mann · eine Frau · ein Kind",tr:"a man · a woman · a child"},
    ],
    quiz:[
      {q:"'die Schwester' means:",opts:["mother","daughter","sister","aunt"],ans:2},
      {q:"'Ich habe' means:",opts:["I am","I have","I want","I give"],ans:1},
      {q:"'My mother' in German:",opts:["mein Mutter","meiner Mutter","meine Mutter","meines Mutter"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Ist das deine Familie?",en:"Is that your family?"},
      {s:"B",de:"Ja! Das ist mein Vater und meine Mutter.",en:"Yes! That's my father and mother."},
      {s:"A",de:"Hast du Geschwister?",en:"Do you have siblings?"},
      {s:"B",de:"Ja, ich habe einen Bruder und eine Schwester.",en:"Yes, I have a brother and sister."},
    ],
  },
  {
    id:4, phase:1, name:"Essen & Trinken — Food & Drink", topics:"Food vocab · Café ordering · möchten",
    vocab:[
      {de:"das Brot",en:"bread",art:"das"},
      {de:"der Käse",en:"cheese",art:"der"},
      {de:"das Fleisch",en:"meat",art:"das"},
      {de:"der Fisch",en:"fish",art:"der"},
      {de:"das Gemüse / das Obst",en:"vegetables / fruit",art:"das"},
      {de:"der Kaffee",en:"coffee",art:"der"},
      {de:"der Tee / das Wasser",en:"tea / water",art:"der/das"},
      {de:"das Bier",en:"beer",art:"das"},
      {de:"lecker",en:"delicious",art:""},
      {de:"hungrig / durstig",en:"hungry / thirsty",art:""},
      {de:"die Rechnung",en:"the bill",art:"die"},
      {de:"die Speisekarte",en:"the menu",art:"die"},
      {de:"Ich möchte...",en:"I would like...",art:""},
      {de:"Was nehmen Sie?",en:"What will you have?",art:""},
      {de:"Noch etwas?",en:"Anything else?",art:""},
    ],
    grammar:[
      {rule:"möchten (would like)",ex:"Ich möchte einen Kaffee. Er möchte Wasser.",tr:"I'd like a coffee. He'd like water."},
      {rule:"Accusative case",ex:"Ich esse den Apfel. Ich trinke die Milch.",tr:"I eat the apple. I drink the milk."},
      {rule:"Café phrases",ex:"Die Rechnung, bitte! / Guten Appetit!",tr:"The bill, please! / Enjoy your meal!"},
    ],
    quiz:[
      {q:"'Ich möchte Wasser' means:",opts:["I have water","I would like water","I drink water","I need water"],ans:1},
      {q:"'die Rechnung' means:",opts:["the menu","the reservation","the bill","the waiter"],ans:2},
      {q:"'lecker' means:",opts:["hungry","thirsty","delicious","expensive"],ans:2},
    ],
    dialogue:[
      {s:"Kellner",de:"Guten Tag! Was möchten Sie bitte?",en:"Good day! What would you like?"},
      {s:"Gast",de:"Ich möchte einen Kaffee und ein Stück Kuchen.",en:"I'd like a coffee and a piece of cake."},
      {s:"Kellner",de:"Sofort! Noch etwas?",en:"Right away! Anything else?"},
      {s:"Gast",de:"Die Rechnung, bitte.",en:"The bill, please."},
    ],
  },
  {
    id:5, phase:2, name:"Wohnen — Home & Housing", topics:"Rooms · Furniture · Prepositions",
    vocab:[
      {de:"die Wohnung",en:"apartment",art:"die"},
      {de:"das Haus",en:"house",art:"das"},
      {de:"das Zimmer",en:"room",art:"das"},
      {de:"die Küche",en:"kitchen",art:"die"},
      {de:"das Schlafzimmer",en:"bedroom",art:"das"},
      {de:"das Badezimmer",en:"bathroom",art:"das"},
      {de:"das Wohnzimmer",en:"living room",art:"das"},
      {de:"der Tisch / der Stuhl",en:"table / chair",art:"der"},
      {de:"das Bett",en:"bed",art:"das"},
      {de:"der Schrank",en:"wardrobe",art:"der"},
      {de:"groß / klein",en:"big / small",art:""},
      {de:"teuer / günstig",en:"expensive / affordable",art:""},
      {de:"es gibt",en:"there is / there are",art:""},
      {de:"auf dem Tisch",en:"on the table",art:""},
      {de:"im Zimmer",en:"in the room",art:""},
    ],
    grammar:[
      {rule:"Local prepositions + Dative",ex:"Das Buch liegt auf dem Tisch. Die Lampe hängt über dem Bett.",tr:"The book is on the table. The lamp hangs above the bed."},
      {rule:"es gibt (there is/are)",ex:"Es gibt ein Sofa im Wohnzimmer.",tr:"There is a sofa in the living room."},
      {rule:"Accusative (movement)",ex:"Ich gehe in die Küche. Er legt das Buch auf den Tisch.",tr:"I go into the kitchen. He puts the book on the table."},
    ],
    quiz:[
      {q:"'das Schlafzimmer' means:",opts:["bathroom","kitchen","bedroom","living room"],ans:2},
      {q:"'Es gibt' means:",opts:["I have","there is","it gives","he goes"],ans:1},
      {q:"Opposite of 'teuer':",opts:["groß","günstig","klein","schön"],ans:1},
    ],
    dialogue:[
      {s:"A",de:"Ich suche eine Wohnung. Haben Sie etwas frei?",en:"I'm looking for an apartment. Do you have anything available?"},
      {s:"B",de:"Ja, wir haben eine 2-Zimmer-Wohnung.",en:"Yes, we have a 2-room apartment."},
      {s:"A",de:"Wie groß ist die Wohnung?",en:"How big is the apartment?"},
      {s:"B",de:"60 Quadratmeter. Sie hat eine Küche und ein Bad.",en:"60 sqm. It has a kitchen and bathroom."},
    ],
  },
  {
    id:6, phase:2, name:"Uhrzeiten — Time & Daily Routine", topics:"Telling time · Days of week · Separable verbs",
    vocab:[
      {de:"Wie spät ist es?",en:"What time is it?",art:""},
      {de:"Es ist acht Uhr.",en:"It is 8 o'clock.",art:""},
      {de:"halb neun",en:"half past eight (8:30)",art:""},
      {de:"Viertel nach drei",en:"quarter past three",art:""},
      {de:"der Morgen / der Abend",en:"morning / evening",art:""},
      {de:"aufstehen",en:"to get up",art:""},
      {de:"frühstücken",en:"to have breakfast",art:""},
      {de:"arbeiten",en:"to work",art:""},
      {de:"schlafen",en:"to sleep",art:""},
      {de:"Montag bis Freitag",en:"Monday to Friday",art:""},
      {de:"das Wochenende",en:"weekend",art:"das"},
      {de:"immer / oft / manchmal / nie",en:"always/often/sometimes/never",art:""},
      {de:"Wann...?",en:"When...?",art:""},
      {de:"um + time",en:"at (a time)",art:""},
      {de:"anfangen",en:"to start/begin",art:""},
    ],
    grammar:[
      {rule:"Telling time",ex:"Es ist acht Uhr. / Es ist halb neun. / Viertel nach drei.",tr:"8:00 / 8:30 / 3:15"},
      {rule:"Separable verbs",ex:"Ich stehe um 7 Uhr auf. Er fängt um 9 an.",tr:"I get up at 7. He starts at 9. (prefix goes to end!)"},
      {rule:"Frequency adverbs",ex:"immer · oft · manchmal · selten · nie",tr:"always · often · sometimes · rarely · never"},
    ],
    quiz:[
      {q:"'Es ist halb neun' means:",opts:["9:00","9:30","8:30","8:15"],ans:2},
      {q:"'aufstehen' means:",opts:["to eat","to get up","to go","to sleep"],ans:1},
      {q:"'manchmal' means:",opts:["always","never","sometimes","often"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Wann stehst du auf?",en:"When do you get up?"},
      {s:"B",de:"Ich stehe immer um sieben Uhr auf.",en:"I always get up at seven."},
      {s:"A",de:"Und wann fängst du mit der Arbeit an?",en:"And when do you start work?"},
      {s:"B",de:"Um halb neun. Und du?",en:"At half past eight. You?"},
    ],
  },
  {
    id:7, phase:2, name:"Einkaufen — Shopping", topics:"Shops · Prices · Colors · Sizes",
    vocab:[
      {de:"der Supermarkt",en:"supermarket",art:"der"},
      {de:"die Bäckerei",en:"bakery",art:"die"},
      {de:"die Apotheke",en:"pharmacy",art:"die"},
      {de:"kaufen / verkaufen",en:"to buy / to sell",art:""},
      {de:"Was kostet das?",en:"How much does it cost?",art:""},
      {de:"der Euro / der Cent",en:"euro / cent",art:"der"},
      {de:"rot / blau / grün",en:"red / blue / green",art:""},
      {de:"schwarz / weiß / gelb",en:"black / white / yellow",art:""},
      {de:"die Größe",en:"size",art:"die"},
      {de:"zu groß / zu klein",en:"too big / too small",art:""},
      {de:"Ich nehme das.",en:"I'll take that.",art:""},
      {de:"Kann ich mit Karte zahlen?",en:"Can I pay by card?",art:""},
      {de:"kein / keine",en:"no / not a (negation)",art:""},
      {de:"Ich habe kein Geld.",en:"I have no money.",art:""},
      {de:"Haben Sie das in...?",en:"Do you have that in...?",art:""},
    ],
    grammar:[
      {rule:"Adjective endings (Accusative)",ex:"einen roten Rock · eine blaue Jacke · ein weißes Hemd",tr:"a red skirt · a blue jacket · a white shirt"},
      {rule:"Prices: Was kostet...?",ex:"Was kostet das? — Es kostet fünf Euro.",tr:"How much does it cost? — Five euros."},
      {rule:"Negation: kein/keine",ex:"Ich habe kein Geld. / Ich habe keine Zeit.",tr:"I have no money. / I have no time."},
    ],
    quiz:[
      {q:"'Was kostet das?' means:",opts:["Where is that?","What is that?","How much does it cost?","Can I have that?"],ans:2},
      {q:"'die Apotheke' is a:",opts:["bakery","pharmacy","supermarket","bookstore"],ans:1},
      {q:"'Ich habe kein Geld' means:",opts:["I have money","I have no money","I need money","I want money"],ans:1},
    ],
    dialogue:[
      {s:"Verkäufer",de:"Kann ich Ihnen helfen?",en:"Can I help you?"},
      {s:"Kunde",de:"Ja, ich suche eine Jacke in Blau.",en:"Yes, I'm looking for a blue jacket."},
      {s:"Verkäufer",de:"Welche Größe?",en:"What size?"},
      {s:"Kunde",de:"Größe M. Was kostet sie?",en:"Size M. How much is it?"},
      {s:"Verkäufer",de:"Fünfzig Euro.",en:"Fifty euros."},
    ],
  },
  {
    id:8, phase:2, name:"Verkehr & Reisen — Transport", topics:"Transport · Directions · Tickets",
    vocab:[
      {de:"der Zug",en:"train",art:"der"},
      {de:"der Bus / das Auto",en:"bus / car",art:"der/das"},
      {de:"das Flugzeug",en:"airplane",art:"das"},
      {de:"der Bahnhof",en:"train station",art:"der"},
      {de:"der Flughafen",en:"airport",art:"der"},
      {de:"die Fahrkarte",en:"ticket",art:"die"},
      {de:"abfahren",en:"to depart",art:""},
      {de:"ankommen",en:"to arrive",art:""},
      {de:"links / rechts",en:"left / right",art:""},
      {de:"geradeaus",en:"straight ahead",art:""},
      {de:"die Straße",en:"street",art:"die"},
      {de:"wie weit?",en:"how far?",art:""},
      {de:"mit dem Zug",en:"by train (dative)",art:""},
      {de:"einfach / hin und zurück",en:"one way / return",art:""},
      {de:"das Gleis",en:"platform/track",art:"das"},
    ],
    grammar:[
      {rule:"'mit' + Dative (transport)",ex:"Ich fahre mit dem Zug / mit dem Bus / mit dem Auto.",tr:"I travel by train / bus / car."},
      {rule:"Directions",ex:"Gehen Sie links / rechts / geradeaus.",tr:"Go left / right / straight ahead."},
      {rule:"Separable: abfahren/ankommen",ex:"Der Zug fährt um 10 ab. Er kommt um 12 an.",tr:"Train departs at 10. Arrives at 12."},
    ],
    quiz:[
      {q:"'der Bahnhof' means:",opts:["airport","bus stop","train station","street"],ans:2},
      {q:"'Ich fahre mit dem Bus' means:",opts:["I drive a bus","I travel by bus","I miss the bus","I see a bus"],ans:1},
      {q:"'geradeaus' means:",opts:["left","right","straight ahead","behind"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Wann fährt der nächste Zug nach Berlin ab?",en:"When does the next train to Berlin depart?"},
      {s:"B",de:"Um 14:30 Uhr vom Gleis 5.",en:"At 14:30 from platform 5."},
      {s:"A",de:"Eine Fahrkarte nach Berlin, bitte.",en:"One ticket to Berlin, please."},
      {s:"B",de:"Einfach oder hin und zurück?",en:"One way or return?"},
    ],
  },
  {
    id:9, phase:3, name:"Gesundheit — Health", topics:"Body parts · Illness · Doctor visit",
    vocab:[
      {de:"der Kopf / der Bauch",en:"head / stomach",art:"der"},
      {de:"der Rücken / der Arm",en:"back / arm",art:"der"},
      {de:"das Bein",en:"leg",art:"das"},
      {de:"krank / gesund",en:"sick / healthy",art:""},
      {de:"der Arzt / das Krankenhaus",en:"doctor / hospital",art:"der/das"},
      {de:"die Medikamente",en:"medication",art:"pl"},
      {de:"Kopfschmerzen",en:"headache",art:"pl"},
      {de:"Fieber / Husten",en:"fever / cough",art:""},
      {de:"sich fühlen",en:"to feel (reflexive)",art:""},
      {de:"Ich fühle mich krank.",en:"I feel sick.",art:""},
      {de:"Mein Kopf tut mir weh.",en:"My head hurts.",art:""},
      {de:"Was fehlt Ihnen?",en:"What is wrong with you?",art:""},
      {de:"Seit wann?",en:"Since when?",art:""},
      {de:"die Apotheke",en:"pharmacy",art:"die"},
      {de:"die Schmerzen",en:"pain (pl)",art:"pl"},
    ],
    grammar:[
      {rule:"Reflexive: sich fühlen",ex:"Ich fühle mich krank. Er fühlt sich gut.",tr:"I feel sick. He feels good."},
      {rule:"Body aches (Dative)",ex:"Mein Kopf tut mir weh. Was tut dir weh?",tr:"My head hurts. What hurts (you)?"},
      {rule:"können (can)",ex:"Ich kann nicht arbeiten. Können Sie mir helfen?",tr:"I cannot work. Can you help me?"},
    ],
    quiz:[
      {q:"'Ich fühle mich krank' means:",opts:["I feel healthy","I feel sick","I feel good","I am tired"],ans:1},
      {q:"'das Krankenhaus' is:",opts:["pharmacy","clinic","hospital","doctor's office"],ans:2},
      {q:"'Kopfschmerzen' means:",opts:["stomach ache","back pain","headache","toothache"],ans:2},
    ],
    dialogue:[
      {s:"Arzt",de:"Was fehlt Ihnen?",en:"What's wrong with you?"},
      {s:"Patient",de:"Ich fühle mich sehr krank. Ich habe Kopfschmerzen und Fieber.",en:"I feel very sick. I have a headache and fever."},
      {s:"Arzt",de:"Seit wann haben Sie die Symptome?",en:"Since when have you had symptoms?"},
      {s:"Patient",de:"Seit gestern. Ich kann nicht schlafen.",en:"Since yesterday. I can't sleep."},
    ],
  },
  {
    id:10, phase:3, name:"Freizeit — Hobbies & Free Time", topics:"Hobbies · gern · weil clauses",
    vocab:[
      {de:"lesen / Musik hören",en:"to read / listen to music",art:""},
      {de:"Sport treiben",en:"to play sports",art:""},
      {de:"reisen / kochen",en:"to travel / to cook",art:""},
      {de:"tanzen / schwimmen",en:"to dance / to swim",art:""},
      {de:"das Kino / das Theater",en:"cinema / theater",art:"das"},
      {de:"gern",en:"gladly / to like (doing)",art:""},
      {de:"lieber",en:"preferably / to prefer",art:""},
      {de:"am liebsten",en:"most of all",art:""},
      {de:"wollen (to want to)",en:"Ich will ins Kino gehen.",art:""},
      {de:"das Wetter",en:"weather",art:"das"},
      {de:"schön / toll",en:"beautiful / great",art:""},
      {de:"langweilig / interessant",en:"boring / interesting",art:""},
      {de:"weil (because)",en:"→ verb goes to END",art:""},
      {de:"das Wochenende",en:"weekend",art:"das"},
      {de:"Was machst du gern?",en:"What do you like doing?",art:""},
    ],
    grammar:[
      {rule:"gern / lieber / am liebsten",ex:"Ich lese gern. Ich reise lieber. Am liebsten koche ich.",tr:"I like reading. I prefer traveling. I love cooking most."},
      {rule:"weil — verb to end!",ex:"Ich lese gern, weil es interessant ist.",tr:"I like reading because it is interesting."},
      {rule:"wollen (to want to)",ex:"Ich will ins Kino gehen. Wir wollen tanzen.",tr:"I want to go to the cinema. We want to dance."},
    ],
    quiz:[
      {q:"'Ich reise gern' means:",opts:["I must travel","I like traveling","I can travel","I travel a lot"],ans:1},
      {q:"In 'weil' clauses, the verb goes:",opts:["at the start","in 2nd position","to the end","anywhere"],ans:2},
      {q:"'am liebsten' expresses:",opts:["least preference","strong dislike","top preference","equal preference"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Was machst du am Wochenende?",en:"What are you doing this weekend?"},
      {s:"B",de:"Ich möchte ins Kino gehen. Kommst du mit?",en:"I'd like to go to the cinema. Coming?"},
      {s:"A",de:"Gern! Welchen Film möchtest du sehen?",en:"Sure! Which film do you want to see?"},
      {s:"B",de:"Ich weiß noch nicht. Wir schauen zusammen.",en:"I don't know yet. We'll look together."},
    ],
  },
  {
    id:11, phase:3, name:"Vergangenheit — Past Tense", topics:"Perfekt · haben/sein · past events",
    vocab:[
      {de:"gestern / letzte Woche",en:"yesterday / last week",art:""},
      {de:"gemacht (machen)",en:"done/made",art:""},
      {de:"gegessen (essen)",en:"eaten",art:""},
      {de:"getrunken (trinken)",en:"drunk",art:""},
      {de:"gegangen (gehen)",en:"gone (sein!)",art:""},
      {de:"gekauft (kaufen)",en:"bought",art:""},
      {de:"gesehen (sehen)",en:"seen",art:""},
      {de:"gefahren (fahren)",en:"driven/traveled (sein!)",art:""},
      {de:"gewesen (sein)",en:"been (sein!)",art:""},
      {de:"aufgestanden",en:"gotten up (sein!)",art:""},
      {de:"schon / noch nie",en:"already / never yet",art:""},
      {de:"Wie war...?",en:"How was...?",art:""},
      {de:"Es war toll!",en:"It was great!",art:""},
      {de:"Ich habe... besucht.",en:"I visited...",art:""},
      {de:"Ich bin... gefahren.",en:"I went/traveled to...",art:""},
    ],
    grammar:[
      {rule:"Perfekt with haben",ex:"Ich habe Kaffee getrunken. Er hat Brot gegessen.",tr:"I drank coffee. He ate bread."},
      {rule:"Perfekt with sein (movement/change)",ex:"Ich bin nach Berlin gefahren. Sie ist aufgestanden.",tr:"I went to Berlin. She got up."},
      {rule:"Regular past participle",ex:"machen→gemacht · kaufen→gekauft · hören→gehört",tr:"ge- + stem + -t (for regular verbs)"},
    ],
    quiz:[
      {q:"'Ich habe Kaffee getrunken':",opts:["I drink coffee","I will drink coffee","I drank coffee","I like coffee"],ans:2},
      {q:"Movement verbs in Perfekt use:",opts:["haben","sein","werden","wollen"],ans:1},
      {q:"Past participle of 'machen':",opts:["machte","gegemacht","gemacht","gemachtet"],ans:2},
    ],
    dialogue:[
      {s:"A",de:"Wie war dein Wochenende?",en:"How was your weekend?"},
      {s:"B",de:"Super! Ich bin nach München gefahren.",en:"Great! I went to Munich."},
      {s:"A",de:"Was hast du dort gemacht?",en:"What did you do there?"},
      {s:"B",de:"Ich habe ein Museum besucht und viel gegessen!",en:"I visited a museum and ate a lot!"},
    ],
  },
  {
    id:12, phase:3, name:"Zukunft & Pläne — Future Plans", topics:"werden · planning · conjunctions",
    vocab:[
      {de:"morgen / bald",en:"tomorrow / soon",art:""},
      {de:"nächste Woche / nächstes Jahr",en:"next week / next year",art:""},
      {de:"planen / vorhaben",en:"to plan / to intend",art:""},
      {de:"der Termin",en:"appointment",art:"der"},
      {de:"die Prüfung",en:"exam",art:"die"},
      {de:"hoffen",en:"to hope",art:""},
      {de:"wahrscheinlich",en:"probably",art:""},
      {de:"vielleicht",en:"maybe",art:""},
      {de:"bestimmt",en:"certainly/definitely",art:""},
      {de:"das Ziel",en:"goal",art:"das"},
      {de:"Ich werde... lernen.",en:"I will learn...",art:""},
      {de:"denn (because/for)",en:"main clause conjunction",art:""},
      {de:"aber (but)",en:"contrast conjunction",art:""},
      {de:"oder (or)",en:"alternative conjunction",art:""},
      {de:"die Zukunft",en:"the future",art:"die"},
    ],
    grammar:[
      {rule:"Future with werden",ex:"Ich werde morgen lernen. Er wird nach Berlin fahren.",tr:"I will study tomorrow. He will go to Berlin."},
      {rule:"Present tense as future",ex:"Morgen gehe ich ins Kino.",tr:"Tomorrow I'm going to the cinema."},
      {rule:"Conjunctions: und/aber/oder/denn",ex:"Ich lerne, denn ich habe eine Prüfung.",tr:"I'm studying because I have an exam."},
    ],
    quiz:[
      {q:"'Ich werde morgen lernen' means:",opts:["I learned yesterday","I am learning now","I will learn tomorrow","I want to learn"],ans:2},
      {q:"'vielleicht' means:",opts:["certainly","never","maybe","always"],ans:2},
      {q:"'denn' means:",opts:["but","or","and","because"],ans:3},
    ],
    dialogue:[
      {s:"A",de:"Was wirst du nächste Woche machen?",en:"What will you do next week?"},
      {s:"B",de:"Ich werde für meine Prüfung lernen.",en:"I will study for my exam."},
      {s:"A",de:"Wann hast du die Prüfung?",en:"When is your exam?"},
      {s:"B",de:"Am Freitag. Ich bin ein bisschen nervös!",en:"On Friday. I'm a little nervous!"},
    ],
  },
  {
    id:13, phase:3, name:"A1 Review & Mock Test", topics:"Full A1 review · Practice exam · Final words",
    vocab:[
      {de:"wiederholen",en:"to review",art:""},
      {de:"verstehen",en:"to understand",art:""},
      {de:"üben",en:"to practice",art:""},
      {de:"richtig / falsch",en:"correct / wrong",art:""},
      {de:"natürlich",en:"of course",art:""},
      {de:"genau",en:"exactly",art:""},
      {de:"ungefähr",en:"approximately",art:""},
      {de:"leider",en:"unfortunately",art:""},
      {de:"toll / wunderbar",en:"great / wonderful",art:""},
      {de:"Herzlichen Glückwunsch!",en:"Congratulations!",art:""},
    ],
    grammar:[
      {rule:"A1 verb conjugation review",ex:"ich lerne · du lernst · er lernt · wir lernen · ihr lernt · sie lernen",tr:"Full present tense pattern for regular verbs"},
      {rule:"Case review: Nom / Acc / Dat",ex:"Der Mann (Nom) gibt dem Kind (Dat) einen Ball (Acc).",tr:"The man gives the child a ball."},
      {rule:"Modal verbs summary",ex:"können · müssen · wollen · dürfen · sollen · möchten",tr:"can · must · want · may · should · would like"},
    ],
    quiz:[
      {q:"Complete: Ich ___ aus Indien.",opts:["bin","komme","habe","gehe"],ans:1},
      {q:"Correct article for 'Wohnung':",opts:["der","das","die","ein"],ans:2},
      {q:"Perfekt of 'gehen' (to go):",opts:["hat gegangen","ist gegangen","wird gehen","haben gegangen"],ans:1},
      {q:"'Ich möchte bitte zahlen' means:",opts:["I want to pay","I would like to pay please","Give me the bill","Can I pay?"],ans:1},
      {q:"'Wo wohnen Sie?' means:",opts:["Where are you from?","Where do you live?","Who are you?","What do you do?"],ans:1},
    ],
    dialogue:[
      {s:"Prüfer",de:"Guten Tag. Wie heißen Sie?",en:"Good day. What is your name?"},
      {s:"Sie",de:"Guten Tag. Ich heiße [Ihr Name].",en:"Good day. My name is [Your Name]."},
      {s:"Prüfer",de:"Woher kommen Sie?",en:"Where do you come from?"},
      {s:"Sie",de:"Ich komme aus Indien. Ich wohne in [Stadt].",en:"I come from India. I live in [city]."},
      {s:"Prüfer",de:"Was machen Sie beruflich?",en:"What do you do for work?"},
      {s:"Sie",de:"Ich lerne Deutsch seit drei Monaten.",en:"I've been learning German for three months."},
    ],
  },
];

const PHRASES = [
  {cat:"🤝 Greetings",items:[
    {de:"Guten Morgen!",en:"Good morning!"},
    {de:"Guten Tag!",en:"Good day!"},
    {de:"Guten Abend!",en:"Good evening!"},
    {de:"Auf Wiedersehen!",en:"Goodbye!"},
    {de:"Wie geht es Ihnen?",en:"How are you? (formal)"},
    {de:"Mir geht es gut, danke.",en:"I'm fine, thank you."},
  ]},
  {cat:"🍽️ Restaurant",items:[
    {de:"Einen Tisch für zwei, bitte.",en:"A table for two, please."},
    {de:"Die Speisekarte, bitte.",en:"The menu, please."},
    {de:"Ich möchte bestellen.",en:"I'd like to order."},
    {de:"Das schmeckt sehr lecker!",en:"That tastes delicious!"},
    {de:"Die Rechnung, bitte.",en:"The bill, please."},
  ]},
  {cat:"🛒 Shopping",items:[
    {de:"Was kostet das?",en:"How much does it cost?"},
    {de:"Ich hätte gern...",en:"I would like..."},
    {de:"Das ist zu teuer.",en:"That's too expensive."},
    {de:"Ich nehme das.",en:"I'll take that."},
    {de:"Kann ich mit Karte zahlen?",en:"Can I pay by card?"},
  ]},
  {cat:"🚆 Transport",items:[
    {de:"Wo ist der Bahnhof?",en:"Where is the station?"},
    {de:"Eine Fahrkarte nach..., bitte.",en:"One ticket to..., please."},
    {de:"Wann fährt der nächste Zug?",en:"When does the next train leave?"},
    {de:"Auf welchem Gleis?",en:"On which platform?"},
  ]},
  {cat:"🏥 Health",items:[
    {de:"Ich bin krank.",en:"I am sick."},
    {de:"Ich habe Kopfschmerzen.",en:"I have a headache."},
    {de:"Wo ist die nächste Apotheke?",en:"Where's the nearest pharmacy?"},
    {de:"Rufen Sie einen Krankenwagen!",en:"Call an ambulance!"},
  ]},
  {cat:"❓ Getting Help",items:[
    {de:"Können Sie das wiederholen?",en:"Can you repeat that?"},
    {de:"Bitte langsamer sprechen.",en:"Please speak more slowly."},
    {de:"Ich verstehe nicht.",en:"I don't understand."},
    {de:"Was bedeutet das?",en:"What does that mean?"},
    {de:"Sprechen Sie Englisch?",en:"Do you speak English?"},
  ]},
];

const GRAMMAR_REF = [
  {
    title:"Articles: der/die/das",level:"Week 1–2",
    content:"German has 3 genders. You MUST learn the article with every noun.",
    table:{head:["Case","Masc","Fem","Neut"],rows:[["Nominative","der","die","das"],["Accusative","den","die","das"],["Dative","dem","der","dem"]]},
    tips:["Nouns ending -ung, -heit, -keit → DIE","Nouns ending -er (agent) → DER","Nouns ending -chen, -lein → DAS"],
    drills:[
      {q:"___ Tisch (table — masculine)",opts:["der","die","das"],ans:0},
      {q:"___ Frau (woman — feminine)",opts:["der","die","das"],ans:1},
      {q:"___ Buch (book — neuter)",opts:["der","die","das"],ans:2},
    ],
  },
  {
    title:"Verb Conjugation",level:"Week 1",
    content:"German verbs change endings based on subject. Learn the pattern for regular verbs.",
    table:{head:["Pronoun","lernen","kommen","machen"],rows:[["ich","lerne","komme","mache"],["du","lernst","kommst","machst"],["er/sie/es","lernt","kommt","macht"],["wir","lernen","kommen","machen"],["sie/Sie","lernen","kommen","machen"]]},
    tips:["er/sie/es always ends in -t","du always ends in -st","wir and sie/Sie match the infinitive"],
    drills:[
      {q:"Er ___ aus Deutschland. (kommen)",opts:["komme","kommen","kommt","kommst"],ans:2},
      {q:"Wir ___ Deutsch. (lernen)",opts:["lerne","lernt","lernst","lernen"],ans:3},
      {q:"Du ___ Kaffee. (trinken)",opts:["trinke","trinkst","trinkt","trinken"],ans:1},
    ],
  },
  {
    title:"Modal Verbs",level:"Week 6–8",
    content:"Modal verbs modify the main verb, which goes to the END in infinitive form.",
    table:{head:["Modal","ich","du","er/sie","Meaning"],rows:[["können","kann","kannst","kann","can"],["müssen","muss","musst","muss","must"],["wollen","will","willst","will","want to"],["dürfen","darf","darfst","darf","may"],["möchten","möchte","möchtest","möchte","would like"]]},
    tips:["Main verb → to the END","✅ Ich kann Deutsch sprechen","❌ Ich kann sprechen Deutsch"],
    drills:[
      {q:"Ich ___ Deutsch sprechen. (can)",opts:["will","kann","muss","darf"],ans:1},
      {q:"Sie ___ einen Arzt besuchen. (must)",opts:["kann","darf","muss","soll"],ans:2},
    ],
  },
  {
    title:"Perfekt (Past Tense)",level:"Week 11",
    content:"Spoken past = haben/sein + past participle. Regular: ge- + stem + -t.",
    table:{head:["Verb","Participle","Aux"],rows:[["machen","gemacht","haben"],["kaufen","gekauft","haben"],["gehen","gegangen","sein"],["fahren","gefahren","sein"],["schreiben","geschrieben","haben"]]},
    tips:["Movement verbs → sein","State change verbs → sein","Everything else → haben","Participle goes to END"],
    drills:[
      {q:"Ich ___ Kaffee getrunken.",opts:["bin","habe","werde"],ans:1},
      {q:"Er ___ nach Berlin gefahren.",opts:["hat","habe","ist"],ans:2},
      {q:"Participle of 'lernen':",opts:["gelernt","gelearnt","gelerntet"],ans:0},
    ],
  },
  {
    title:"Word Order (Satzbau)",level:"All levels",
    content:"VERB IS ALWAYS IN POSITION 2 in main clauses. Subordinate clauses: verb goes to END.",
    table:{head:["Structure","Example"],rows:[["Main clause","Ich lerne jeden Tag Deutsch."],["Question","Lernst du Deutsch?"],["weil clause","...weil ich nach Deutschland fahre."],["Time→Manner→Place","Ich fahre morgen mit dem Zug nach Berlin."]]},
    tips:["Verb ALWAYS position 2 in main clause","weil/dass/ob → verb to end","Questions → verb first","Remember: Time → Manner → Place"],
    drills:[
      {q:"Correct: Ich / heute / lerne / Deutsch",opts:["Ich heute Deutsch lerne.","Ich lerne heute Deutsch.","Heute Ich lerne Deutsch."],ans:1},
      {q:"In 'weil' clauses, verb goes:",opts:["position 1","position 2","to the end"],ans:2},
    ],
  },
];

const MILESTONES = [
  {day:7, text:"Introduce yourself fully in German 🗣️"},
  {day:14, text:"Count to 100 without mistakes 🔢"},
  {day:21, text:"Describe your family in 5 sentences 👨‍👩‍👧"},
  {day:30, text:"Order food at a café ☕"},
  {day:45, text:"Give & understand simple directions 🗺️"},
  {day:60, text:"Talk about your past weekend 📅"},
  {day:75, text:"Describe daily routine fluently ⏰"},
  {day:90, text:"Complete A1 mock speaking test 🎓"},
];

// ─── STORAGE ───────────────────────────────────────────────
function loadData() {
  try {
    const s = localStorage.getItem("de_a1_v2");
    if (s) return JSON.parse(s);
  } catch {}
  return {
    startDate: new Date().toISOString(),
    completedDays: [],
    weekDone: {},
    xp: 0,
    quizTotal: 0,
    quizCorrect: 0,
    milestonesDone: {},
  };
}
function saveData(d) {
  try { localStorage.setItem("de_a1_v2", JSON.stringify(d)); } catch {}
}
function todayKey() { return new Date().toISOString().split("T")[0]; }
function getStreak(completedDays) {
  let s = 0;
  const t = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(t); d.setDate(d.getDate() - i);
    if (completedDays.includes(d.toISOString().split("T")[0])) s++;
    else if (i > 0) break;
  }
  return s;
}
function daysSince(iso) {
  return Math.floor((new Date() - new Date(iso)) / 86400000) + 1;
}

// ─── SPEAK ─────────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = 0.85;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

// ─── SUB COMPONENTS ────────────────────────────────────────
function Tag({ color, children }) {
  const colors = {
    gold: { bg: "rgba(240,192,64,0.12)", border: "rgba(240,192,64,0.25)", text: C.gold },
    green: { bg: "rgba(61,219,160,0.12)", border: "rgba(61,219,160,0.25)", text: C.green },
    blue: { bg: "rgba(90,174,255,0.12)", border: "rgba(90,174,255,0.25)", text: C.blue },
    purple: { bg: "rgba(176,106,255,0.12)", border: "rgba(176,106,255,0.25)", text: C.purple },
  };
  const c = colors[color] || colors.gold;
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
      {children}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}

function SectionHead({ icon, title, badge, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</span>
      {badge && <span style={{ marginLeft: "auto", background: `rgba(240,192,64,0.1)`, border: `1px solid rgba(240,192,64,0.2)`, color: C.gold, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{badge}</span>}
    </div>
  );
}

// ─── QUIZ BLOCK ────────────────────────────────────────────
function QuizBlock({ quiz, onCorrect }) {
  const [answers, setAnswers] = useState({});
  return (
    <div>
      {quiz.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 10, lineHeight: 1.5 }}>
            {qi + 1}. {q.q}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {q.opts.map((opt, oi) => {
              const picked = answers[qi];
              const isSelected = picked === oi;
              const isCorrect = oi === q.ans;
              const revealed = picked !== undefined;
              let bg = C.dark, border = C.border, color = C.text;
              if (revealed) {
                if (isCorrect) { bg = "rgba(61,219,160,0.12)"; border = C.green; color = C.green; }
                else if (isSelected) { bg = "rgba(255,90,90,0.12)"; border = C.red; color = C.red; }
              }
              return (
                <div key={oi} onClick={() => {
                  if (revealed) return;
                  setAnswers(a => ({ ...a, [qi]: oi }));
                  if (oi === q.ans) onCorrect?.();
                }}
                  style={{ background: bg, border: `1.5px solid ${border}`, color, borderRadius: 12, padding: "11px 14px", fontSize: 13, cursor: revealed ? "default" : "pointer", transition: "all 0.2s" }}>
                  {opt}
                </div>
              );
            })}
          </div>
          {answers[qi] !== undefined && (
            <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: answers[qi] === q.ans ? C.green : C.red, background: answers[qi] === q.ans ? "rgba(61,219,160,0.08)" : "rgba(255,90,90,0.08)", border: `1px solid ${answers[qi] === q.ans ? "rgba(61,219,160,0.2)" : "rgba(255,90,90,0.2)"}`, borderRadius: 8, padding: "8px 12px" }}>
              {answers[qi] === q.ans ? "✅ Richtig! (Correct!)" : `❌ Falsch! Correct: ${q.opts[q.ans]}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FLASHCARDS ────────────────────────────────────────────
function FlashCards({ vocab }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const v = vocab[idx];
  return (
    <div>
      <div onClick={() => setFlipped(f => !f)} style={{ minHeight: 130, borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 20, transition: "all 0.3s", background: flipped ? "linear-gradient(135deg,#14141f,rgba(90,174,255,0.08))" : "linear-gradient(135deg,#14141f,rgba(240,192,64,0.08))", border: `1px solid ${flipped ? "rgba(90,174,255,0.3)" : "rgba(240,192,64,0.3)"}` }}>
        <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
          {flipped ? "🇬🇧 English" : "🇩🇪 German"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, textAlign: "center", color: flipped ? C.blue : C.gold }}>
          {flipped ? v.en : v.de}
        </div>
        {v.art && !flipped && <div style={{ marginTop: 8, background: "rgba(90,174,255,0.12)", border: "1px solid rgba(90,174,255,0.25)", color: C.blue, borderRadius: 6, padding: "2px 8px", fontSize: 11 }}>{v.art}</div>}
        <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>Tap to {flipped ? "flip back" : "reveal"}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <button onClick={() => { setIdx(i => (i - 1 + vocab.length) % vocab.length); setFlipped(false); }}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 18px", fontSize: 13, color: C.text, cursor: "pointer" }}>← Prev</button>
        <span style={{ fontSize: 12, color: C.muted, fontFamily: "monospace" }}>{idx + 1} / {vocab.length}</span>
        <button onClick={() => { setIdx(i => (i + 1) % vocab.length); setFlipped(false); }}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 18px", fontSize: 13, color: C.text, cursor: "pointer" }}>Next →</button>
      </div>
    </div>
  );
}

// ─── LESSON SCREEN ─────────────────────────────────────────
function LessonScreen({ week, onBack, onComplete, isDone, onQuizCorrect }) {
  const [tab, setTab] = useState("vocab");
  const [revealed, setRevealed] = useState({});
  const tabs = [{ id: "vocab", label: "📚 Vocab" }, { id: "grammar", label: "📐 Grammar" }, { id: "cards", label: "🃏 Cards" }, { id: "dialogue", label: "💬 Talk" }, { id: "quiz", label: "🧠 Quiz" }];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: C.dark, borderBottom: `1px solid ${C.border}` }}>
        <button onClick={onBack} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", color: C.text, flexShrink: 0 }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.gold, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Week {week.id}: {week.name}</div>
          <div style={{ fontSize: 11, color: C.muted }}>{week.topics}</div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, background: C.dark, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: "0 0 auto", padding: "10px 14px", fontSize: 12, fontWeight: 700, color: tab === t.id ? C.gold : C.muted, background: "transparent", border: "none", cursor: "pointer", borderBottom: `2px solid ${tab === t.id ? C.gold : "transparent"}`, whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, paddingBottom: 100 }}>
        {tab === "vocab" && (
          <Card>
            <SectionHead icon="📚" title={`${week.vocab.length} Words`} badge="Tap EN to reveal" />
            {week.vocab.map((v, i) => (
              <div key={i} onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: i < week.vocab.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
                {v.art && <span style={{ background: "rgba(90,174,255,0.12)", border: "1px solid rgba(90,174,255,0.2)", color: C.blue, borderRadius: 4, padding: "1px 6px", fontSize: 10, flexShrink: 0 }}>{v.art}</span>}
                <span style={{ fontSize: 14, fontWeight: 600, flex: 2 }}>{v.de}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={e => { e.stopPropagation(); speak(v.de); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0 }}>🔊</button>
                  <span style={{ fontSize: 13, color: revealed[i] ? C.muted : "transparent", background: revealed[i] ? "transparent" : C.muted, borderRadius: 4, padding: revealed[i] ? 0 : "2px 8px", transition: "all 0.3s", whiteSpace: "nowrap" }}>
                    {v.en}
                  </span>
                </div>
              </div>
            ))}
          </Card>
        )}

        {tab === "grammar" && (
          <div>
            {week.grammar.map((g, i) => (
              <Card key={i} style={{ background: "rgba(90,174,255,0.04)", border: `1px solid rgba(90,174,255,0.18)` }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.blue, marginBottom: 8, fontFamily: "monospace" }}>{g.rule}</div>
                <div style={{ fontSize: 13, color: C.text, marginBottom: 6, lineHeight: 1.6 }}>{g.ex}</div>
                <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>{g.tr}</div>
              </Card>
            ))}
          </div>
        )}

        {tab === "cards" && (
          <Card>
            <SectionHead icon="🃏" title="Flashcards" badge={`${week.vocab.length} cards`} />
            <FlashCards vocab={week.vocab} />
          </Card>
        )}

        {tab === "dialogue" && (
          <Card>
            <SectionHead icon="💬" title="Dialogue" />
            {week.dialogue.map((l, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 4 }}>{l.s}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ flex: 1 }}>{l.de}</span>
                  <button onClick={() => speak(l.de)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, flexShrink: 0, padding: 0 }}>🔊</button>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{l.en}</div>
              </div>
            ))}
            <button onClick={() => { week.dialogue.forEach((l, i) => setTimeout(() => speak(l.de), i * 2500)); }}
              style={{ width: "100%", background: "transparent", border: `1.5px solid ${C.gold}`, borderRadius: 14, padding: 13, fontSize: 14, fontWeight: 700, color: C.gold, cursor: "pointer", marginTop: 8 }}>
              🔊 Play Full Dialogue
            </button>
          </Card>
        )}

        {tab === "quiz" && (
          <Card>
            <SectionHead icon="🧠" title="Quick Quiz" badge={`${week.quiz.length} Q`} />
            <QuizBlock quiz={week.quiz} onCorrect={onQuizCorrect} />
          </Card>
        )}

        <button onClick={onComplete}
          style={{ width: "100%", background: isDone ? C.green : C.gold, color: C.bg, border: "none", borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 4 }}>
          {isDone ? "✅ Week Completed! +50 XP" : "✅ Mark Week Complete (+50 XP)"}
        </button>
      </div>
    </div>
  );
}

// ─── HOME SCREEN ───────────────────────────────────────────
function HomeScreen({ data, onOpenWeek }) {
  const done = data.completedDays.length;
  const streak = getStreak(data.completedDays);
  const currentDay = daysSince(data.startDate);
  const currentWeekNum = Math.ceil(Math.min(currentDay, 90) / 7);
  const radius = 48, circ = 2 * Math.PI * radius;
  const offset = circ - (done / 90) * circ;

  const phases = [
    { n: 1, label: "Phase 1 — Foundation", weeks: "Weeks 1–4", color: C.gold },
    { n: 2, label: "Phase 2 — Building Blocks", weeks: "Weeks 5–8", color: C.blue },
    { n: 3, label: "Phase 3 — Real German", weeks: "Weeks 9–13", color: C.green },
  ];

  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 44 }}>🇩🇪</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 900, color: C.gold, marginTop: 8 }}>Your German Journey</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>90 days to A1 mastery · 1–1.5 hrs daily</div>
      </div>

      {/* Ring */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <div style={{ position: "relative", width: 116, height: 116 }}>
          <svg width="116" height="116" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="58" cy="58" r={radius} fill="none" stroke={C.border} strokeWidth="8" />
            <circle cx="58" cy="58" r={radius} fill="none" stroke={C.gold} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 900, color: C.gold, lineHeight: 1 }}>{done}</div>
            <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>of 90 days</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { val: Object.keys(data.weekDone).length * 15, label: "Words", color: C.gold },
          { val: data.quizTotal > 0 ? Math.round((data.quizCorrect / data.quizTotal) * 100) + "%" : "—", label: "Accuracy", color: C.green },
          { val: data.xp || 0, label: "XP", color: C.blue },
        ].map((s, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Phases */}
      {phases.map(ph => (
        <div key={ph.n}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 10px" }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: ph.color, flexShrink: 0 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{ph.label}</div>
            <div style={{ marginLeft: "auto", fontSize: 10, color: C.muted, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "3px 8px" }}>{ph.weeks}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WEEKS.filter(w => w.phase === ph.n).map(w => {
              const isDone = !!data.weekDone[w.id];
              const isCurrent = w.id === currentWeekNum;
              const isLocked = w.id > currentWeekNum + 1;
              return (
                <div key={w.id} onClick={() => !isLocked && onOpenWeek(w.id)}
                  style={{ background: isDone ? "rgba(61,219,160,0.05)" : isCurrent ? "rgba(240,192,64,0.05)" : C.card, border: `1px solid ${isDone ? C.green : isCurrent ? C.gold : C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: isLocked ? "default" : "pointer", opacity: isLocked ? 0.45 : 1, transition: "all 0.2s" }}>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", minWidth: 28 }}>W{w.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{w.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{w.topics}</div>
                  </div>
                  <div style={{ fontSize: 18 }}>{isLocked ? "🔒" : isDone ? "✅" : isCurrent ? "▶️" : "○"}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TRACKER SCREEN ────────────────────────────────────────
function TrackerScreen({ data, onMarkToday }) {
  const today = todayKey();
  const start = new Date(data.startDate);
  const streak = getStreak(data.completedDays);
  const [checkDone, setCheckDone] = useState({});

  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 900, color: C.gold }}>90-Day Calendar</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Your daily study heatmap</div>
      </div>

      {/* Calendar */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: C.muted, fontWeight: 700 }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 3 }}>
          {Array.from({ length: 90 }, (_, i) => {
            const d = new Date(start); d.setDate(d.getDate() + i);
            const key = d.toISOString().split("T")[0];
            const isToday = key === today;
            const isDone = data.completedDays.includes(key);
            const isFuture = new Date(key) > new Date(today);
            return (
              <div key={i} style={{
                aspectRatio: "1", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, fontFamily: "monospace",
                background: isDone ? "rgba(61,219,160,0.18)" : isToday ? "rgba(240,192,64,0.18)" : C.dark,
                border: `1px solid ${isDone ? C.green : isToday ? C.gold : C.border}`,
                color: isDone ? C.green : isToday ? C.gold : isFuture ? C.border : C.muted,
              }}>{i + 1}</div>
            );
          })}
        </div>
      </Card>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, margin: "16px 0" }}>
        {[
          { val: data.completedDays.length, label: "Completed", color: C.green },
          { val: streak, label: "Streak 🔥", color: C.gold },
          { val: Math.max(0, 90 - data.completedDays.length), label: "Remaining", color: C.blue },
        ].map((s, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Daily Checklist */}
      <Card>
        <SectionHead icon="⏱️" title="Daily 90-Min Plan" />
        {[
          "📹 Udemy video lesson (20–25 min)",
          "📖 This course — vocab + grammar (25 min)",
          "🃏 Flashcard review (10 min)",
          "🦜 Duolingo practice (10 min)",
          "✍️ Write 3 sentences with today's vocab (10 min)",
          "🗣️ Read today's dialogue aloud (5 min)",
        ].map((item, i) => (
          <div key={i} onClick={() => setCheckDone(c => ({ ...c, [i]: !c[i] }))}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checkDone[i] ? C.green : C.border}`, background: checkDone[i] ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, transition: "all 0.2s" }}>
              {checkDone[i] ? "✓" : ""}
            </div>
            <span style={{ fontSize: 13, color: checkDone[i] ? C.muted : C.text, textDecoration: checkDone[i] ? "line-through" : "none" }}>{item}</span>
          </div>
        ))}
        <button onClick={onMarkToday}
          style={{ width: "100%", background: C.gold, color: C.bg, border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 800, cursor: "pointer", marginTop: 14 }}>
          ✅ Mark Today Complete (+20 XP)
        </button>
      </Card>

      {/* Milestones */}
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: C.muted, margin: "18px 0 10px" }}>A1 Milestones</div>
      {MILESTONES.map((m, i) => {
        const done = !!data.milestonesDone?.[i];
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: done ? "rgba(61,219,160,0.04)" : C.card, border: `1px solid ${done ? "rgba(61,219,160,0.25)" : C.border}`, borderRadius: 14, marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontFamily: "monospace", color: C.muted, minWidth: 42, fontWeight: 700 }}>Day {m.day}</div>
            <div style={{ flex: 1, fontSize: 13, color: done ? C.muted : C.text, textDecoration: done ? "line-through" : "none" }}>{m.text}</div>
            <div style={{ fontSize: 16 }}>{done ? "✅" : "○"}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PHRASEBOOK SCREEN ─────────────────────────────────────
function PhrasesScreen() {
  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 900, color: C.gold }}>Phrasebook</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Essential A1 German phrases · Tap 🔊</div>
      </div>
      {PHRASES.map((cat, ci) => (
        <Card key={ci}>
          <SectionHead icon={cat.cat.split(" ")[0]} title={cat.cat.split(" ").slice(1).join(" ")} />
          {cat.items.map((p, pi) => (
            <div key={pi} onClick={() => speak(p.de)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: pi < cat.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{p.de}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{p.en}</div>
              </div>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🔊</span>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// ─── GRAMMAR SCREEN ────────────────────────────────────────
function GrammarScreen() {
  const [drillAnswers, setDrillAnswers] = useState({});
  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 900, color: C.gold }}>Grammar Hub</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>A1 reference tables + drills</div>
      </div>
      {GRAMMAR_REF.map((gt, gi) => (
        <Card key={gi}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, flex: 1 }}>{gt.title}</div>
            <Tag color="gold">{gt.level}</Tag>
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>{gt.content}</div>

          {/* Table */}
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>{gt.table.head.map((h, i) => <th key={i} style={{ padding: "6px 8px", background: C.dark, color: C.gold, textAlign: "left", border: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {gt.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => <td key={ci} style={{ padding: "6px 8px", border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace", whiteSpace: "nowrap" }}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          {gt.tips.map((tip, ti) => (
            <div key={ti} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ color: C.gold, flexShrink: 0 }}>💡</span>
              <span style={{ fontSize: 13, color: C.text }}>{tip}</span>
            </div>
          ))}

          {/* Drills */}
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted, margin: "14px 0 10px" }}>Quick Drills</div>
          {gt.drills.map((d, di) => {
            const key = `${gi}-${di}`;
            const picked = drillAnswers[key];
            return (
              <div key={di} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{d.q}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.opts.map((opt, oi) => {
                    const isCorrect = oi === d.ans;
                    const isSelected = picked === oi;
                    const revealed = picked !== undefined;
                    let bg = C.dark, border = C.border, color = C.text;
                    if (revealed) {
                      if (isCorrect) { bg = "rgba(61,219,160,0.1)"; border = C.green; color = C.green; }
                      else if (isSelected) { bg = "rgba(255,90,90,0.1)"; border = C.red; color = C.red; }
                    }
                    return (
                      <div key={oi} onClick={() => { if (picked === undefined) setDrillAnswers(a => ({ ...a, [key]: oi })); }}
                        style={{ background: bg, border: `1.5px solid ${border}`, color, borderRadius: 10, padding: "9px 12px", fontSize: 13, cursor: picked === undefined ? "pointer" : "default" }}>
                        {opt}
                      </div>
                    );
                  })}
                </div>
                {picked !== undefined && <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: picked === d.ans ? C.green : C.red }}>{picked === d.ans ? "✅ Richtig!" : "❌ Falsch!"}</div>}
              </div>
            );
          })}
        </Card>
      ))}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState("home");
  const [openWeek, setOpenWeek] = useState(null);
  const [toast, setToast] = useState(null);

  const update = useCallback((fn) => {
    setData(d => { const nd = fn({ ...d }); saveData(nd); return nd; });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleOpenWeek = (id) => {
    setOpenWeek(id);
    setTab("lesson");
  };

  const handleComplete = () => {
    if (!openWeek) return;
    update(d => {
      if (!d.weekDone[openWeek]) {
        d.weekDone[openWeek] = true;
        d.xp = (d.xp || 0) + 50;
        const k = todayKey();
        if (!d.completedDays.includes(k)) { d.completedDays.push(k); d.xp += 20; }
        showToast("🎉 Glückwunsch! Week complete! +50 XP");
      }
      return d;
    });
  };

  const handleMarkToday = () => {
    const k = todayKey();
    if (data.completedDays.includes(k)) { showToast("Already done today! Keep it up 🔥"); return; }
    update(d => { d.completedDays.push(k); d.xp = (d.xp || 0) + 20; return d; });
    showToast("✅ Day marked complete! +20 XP");
  };

  const handleQuizCorrect = () => {
    update(d => { d.quizCorrect = (d.quizCorrect || 0) + 1; d.quizTotal = (d.quizTotal || 0) + 1; d.xp = (d.xp || 0) + 10; return d; });
  };

  const week = openWeek ? WEEKS.find(w => w.id === openWeek) : null;
  const streak = getStreak(data.completedDays);

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "tracker", icon: "📅", label: "Track" },
    { id: "grammar", icon: "📐", label: "Grammar" },
    { id: "phrases", icon: "💬", label: "Phrases" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg, color: C.text, fontFamily: "'Helvetica Neue', sans-serif", overflow: "hidden" }}>
      {/* TOP NAV */}
      {tab !== "lesson" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(11,11,18,0.95)", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 900, color: C.gold }}>🇩🇪 Deutsch A1</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 12px", fontSize: 13, fontWeight: 700 }}>
            🔥 <span style={{ color: C.gold }}>{streak}</span> day streak
          </div>
        </div>
      )}

      {/* SCREEN CONTENT */}
      <div style={{ flex: 1, overflowY: tab === "lesson" ? "hidden" : "auto", display: "flex", flexDirection: "column" }}>
        {tab === "lesson" && week ? (
          <LessonScreen
            week={week}
            onBack={() => { setTab("home"); setOpenWeek(null); }}
            onComplete={handleComplete}
            isDone={!!data.weekDone[openWeek]}
            onQuizCorrect={handleQuizCorrect}
          />
        ) : tab === "home" ? (
          <HomeScreen data={data} onOpenWeek={handleOpenWeek} />
        ) : tab === "tracker" ? (
          <TrackerScreen data={data} onMarkToday={handleMarkToday} />
        ) : tab === "grammar" ? (
          <GrammarScreen />
        ) : (
          <PhrasesScreen />
        )}
      </div>

      {/* BOTTOM TAB BAR */}
      {tab !== "lesson" && (
        <div style={{ display: "flex", background: "rgba(11,11,18,0.97)", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 8px", background: "transparent", border: "none", cursor: "pointer", gap: 3 }}>
              <span style={{ fontSize: 22, transform: tab === t.id ? "translateY(-2px)" : "none", transition: "transform 0.2s" }}>{t.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: tab === t.id ? C.gold : C.muted }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", background: C.card, border: `1px solid ${C.gold}`, color: C.gold, borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, zIndex: 999, whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
