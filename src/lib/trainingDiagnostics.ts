'use client';

import { SessionType } from '@/lib/sessionTraining';

export interface PhaseField {
  field: string;
  label: string;
  options: string[];
  spectrum?: boolean;
  exclusiveOption?: string;
}

export interface TrainingFormData {
  BODY_STATE?: string[];
  RELEASE_FEEL?: string[];
  MENTAL_READINESS?: string[];
  HARD_SECTOR_DOUBLE?: string[];
  HARD_SECTOR_TRIPLE?: string[];
  MECHANICS_ISSUE?: string[];
  FINISHING50_PROBLEM?: string[];
  DOUBLE_CLOCK_PROBLEM?: string[];
  GAME170_PROBLEM?: string[];
  STRESS_SIMULATION?: string[];
  BREATHING_EFFECT?: string[];
  FATIGUE?: string[];
  OVERALL_SCORE?: number;
}

export interface TrainingFeedback {
  score: number;
  summary_title: string;
  positives: string[];
  negatives: string[];
  coach_advice: string;
}

function has(arr: string[] | undefined, value: string): boolean {
  return !!arr && arr.includes(value);
}

export function getPhaseFields(phaseIndex: number, type: SessionType): PhaseField[] {
  switch (phaseIndex) {
    case 0: // Rozgrzewka
      return [
        {
          field: 'BODY_STATE',
          label: 'Jak czuło się ciało po rozgrzewce?',
          options: ['Mięskie zimne / spięte', 'Rozgrzany w normie', 'Świetnie rozgrzany'],
          spectrum: true,
        },
        {
          field: 'RELEASE_FEEL',
          label: 'Jak wyglądało wypuszczenie lotki?',
          options: ['Ręka spięta / zrywanie rzutu', 'Nieregularny rytm / falowanie płynności', 'Luźny, płynny rzut'],
          spectrum: true,
        },
        {
          field: 'MENTAL_READINESS',
          label: 'Gotowość mentalna?',
          options: ['Brak skupienia / rozproszenie', 'Średnia koncentracja', 'Pełna gotowość i ostrość'],
          spectrum: true,
        },
      ];
    case 1: // Ćwiczenia główne
      return [
        {
          field: type === 'double' ? 'HARD_SECTOR_DOUBLE' : 'HARD_SECTOR_TRIPLE',
          label: type === 'double' 
            ? 'Która sekwencja sprawiła najwięcej problemów?' 
            : 'Która sekwencja sprawiła najwięcej problemów?',
          options: type === 'double'
            ? ['D20 / D10 / D5 (Góra / Prawo)', 'D16 / D8 / D4 (Lewa strona)', 'Bullseye (Środek tarczy)', 'Bez problemów / wysoka skuteczność']
            : ['Triple 20 (Góra tarczy)', 'Triple 19 (Dół tarczy)', 'Bullseye (Środek tarczy)', 'Bez problemów / wysoka skuteczność'],
          exclusiveOption: 'Bez problemów / wysoka skuteczność',
        },
        {
          field: 'MECHANICS_ISSUE',
          label: 'Co najlepiej opisuje problem techniczny?',
          options: [
            'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)',
            'Powyżej celu (przepchnięcie lotki / zbyt późne otwarcie dłoni)',
            'Ściąganie w lewo/prawo (uciekanie łokcia z osi / obrót tułowia)',
            'Niestabilna postawa / utrata balansu na oche',
            type === 'double' ? 'Różna wysokość rzutów w jednej serii (tzw. "drabinka")' : 'Ciasne rzuty, ale w pojedynczą wartość (blokowanie się na drutach T20/T19)',
            'Brak problemów / wysoka powtarzalność',
          ],
          exclusiveOption: 'Brak problemów / wysoka powtarzalność',
        },
      ];
    case 2: // Strategia i symulacja
      return type === 'double'
        ? [
            {
              field: 'FINISHING50_PROBLEM',
              label: 'Co sprawiało trudność w Finishing 50?',
              options: [
                'Brak trafienia w duży sektor na ustawienie dubla (np. pudło w duży pole zamiast S10/S16)',
                'Nietrafianie dubla w pierwszej serii (przez co wynik od razu spadał o -1)',
                'Przypadkowe trafienie w dubel/triple przy ustawianiu (popsucie licznika)',
                'Trudność z powrotem do skupienia po spadku punktowym (efekt "spalenia" serii)',
                'Brak problemów / płynne czyszczenie i zamykanie',
              ],
              exclusiveOption: 'Brak problemów / płynne czyszczenie i zamykanie',
            },
            {
              field: 'DOUBLE_CLOCK_PROBLEM',
              label: 'Co sprawiało trudność w Zegarze na doublach?',
              options: [
                'Seryjne pudła na zewnątrz tarczy (lotki tuż obok drutu w puste pole)',
                'Problem z dublami na dole tarczy (D3, D19, D7, D17) – spadek łokcia / złe pochylenie',
                'Zacinanie się na jednym dublu (strata wielu serii na jedną wartość)',
                'Trudność z płynnym PRZESTAWIANIEM SIĘ na oche po trafieniu (zmiana kąta rzutu)',
                'Brak problemów / płynne przechodzenie tarczy',
              ],
              exclusiveOption: 'Brak problemów / płynne przechodzenie tarczy',
            },
          ]
        : [
            {
              field: 'GAME170_PROBLEM',
              label: 'Co sprawiało trudność w Grze 170?',
              options: [
                'Brak pierwszej lotki w T20 (trudność ze \'wejściem\' w serię podwójnym potrójnym)',
                'Asekuracyjne rzuty w duże pola (brak ryzyka rzutu w potrójne pole)',
                'Gubienie się w optymalnej ścieżce wyjścia przy nietrafionym pierwszym potrójnym',
                'Spadek skuteczności na dublu kończącym po trafieniu potrójnych',
                'Brak problemów / szybkie zamykanie w niewielu podejściach',
              ],
              exclusiveOption: 'Brak problemów / szybkie zamykanie w niewielu podejściach',
            },
            {
              field: 'FINISHING50_PROBLEM',
              label: 'Co sprawiało trudność w Finishing 50?',
              options: [
                'Brak trafienia w duży sektor na ustawienie dubla (np. pudło w duży pole zamiast S10/S16)',
                'Nietrafianie dubla w pierwszej serii (przez co wynik od razu spadał o -1)',
                'Przypadkowe trafienie w dubel/triple przy ustawianiu (popsucie licznika)',
                'Trudność z powrotem do skupienia po spadku punktowym (efekt "spalenia" serii)',
                'Brak problemów / płynne czyszczenie i zamykanie',
              ],
              exclusiveOption: 'Brak problemów / płynne czyszczenie i zamykanie',
            },
          ];
    case 3: // Trening mentalny
      return [
        {
          field: 'STRESS_SIMULATION',
          label: 'Jak poszła symulacja stresu?',
          options: ['Trudność z wyobrażeniem sytuacji meczowej', 'Odczuwalny realny stres / skok tętna', 'Pełny spokój / brak reakcji emocjonalnej'],
          spectrum: true,
        },
        {
          field: 'BREATHING_EFFECT',
          label: 'Efekt ćwiczeń oddechowych?',
          options: ['Nadal spięty / ciało sztywne', 'Średnie wyciszenie', 'Pełny spokój i tętno w normie'],
          spectrum: true,
        },
      ];
    default: // Cool down
      return [
        {
          field: 'FATIGUE',
          label: 'Jak się czujesz po treningu?',
          options: ['Ręka / bark zmęczony', 'Zmęczenie psychiczne / spadek koncentracji', 'Świeżość do końca'],
          spectrum: true,
        },
      ];
  }
}

export function generateTrainingFeedback(data: TrainingFormData): TrainingFeedback {
  const positives: string[] = [];
  const negatives: string[] = [];

  // Rozgrzewka
  if (has(data.RELEASE_FEEL, 'Luźny, płynny rzut')) positives.push('Luźny i płynny rzut podczas rozgrzewki');
  if (has(data.RELEASE_FEEL, 'Ręka spięta / zrywanie rzutu')) negatives.push('Spięta ręka / zrywanie przy rzucie w rozgrzewce');
  if (has(data.BODY_STATE, 'Świetnie rozgrzany')) positives.push('Świetne rozgrzanie przed treningiem');
  if (has(data.BODY_STATE, 'Mięskie zimne / spięte')) negatives.push('Zimne, spięte mięśnie na starcie treningu');
  if (has(data.MENTAL_READINESS, 'Pełna gotowość i ostrość')) positives.push('Pełna gotowość mentalna od początku');
  if (has(data.MENTAL_READINESS, 'Brak skupienia / rozproszenie')) negatives.push('Brak skupienia na starcie treningu');

  // Mechanika
  if (has(data.MECHANICS_ISSUE, 'Brak problemów / wysoka powtarzalność'))
    positives.push('Wysoka powtarzalność techniki rzutu');
  if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)'))
    negatives.push('Opuszczanie łokcia przy rzutach poniżej celu');
  if (has(data.MECHANICS_ISSUE, 'Powyżej celu (przepchnięcie lotki / zbyt późne otwarcie dłoni)'))
    negatives.push('Przepchnięcie lotki przy rzutach powyżej celu');
  if (has(data.MECHANICS_ISSUE, 'Ściąganie w lewo/prawo (uciekanie łokcia z osi / obrót tułowia)'))
    negatives.push('Ściąganie lotek w bok od celu');
  if (has(data.MECHANICS_ISSUE, 'Niestabilna postawa / utrata balansu na oche'))
    negatives.push('Utrata balansu przy rzutach w skrajne sektory');
  if (has(data.MECHANICS_ISSUE, 'Różna wysokość rzutów w jednej serii (tzw. "drabinka")'))
    negatives.push('Nierówna wysokość rzutów w serii');
  if (has(data.MECHANICS_ISSUE, 'Ciasne rzuty, ale w pojedynczą wartość (blokowanie się na drutach T20/T19)'))
    negatives.push('Blokowanie się na drutach przy rzutach w potrójne');

  // Finishing 50
  if (has(data.FINISHING50_PROBLEM, 'Brak problemów / płynne czyszczenie i zamykanie'))
    positives.push('Finishing 50 bez większych problemów');
  if (has(data.FINISHING50_PROBLEM, 'Brak trafienia w duży sektor na ustawienie dubla'))
    negatives.push('Trudność z ustawieniem dubla w Finishing 50');
  if (has(data.FINISHING50_PROBLEM, 'Nietrafianie dubla w pierwszej serii'))
    negatives.push('Nietrafianie dubla w pierwszej próbie');
  if (has(data.FINISHING50_PROBLEM, 'Przypadkowe trafienie w dubel/triple przy ustawianiu'))
    negatives.push('Popsucie licznika przez przypadkowe trafienie');
  if (has(data.FINISHING50_PROBLEM, 'Trudność z powrotem do skupienia po spadku punktowym'))
    negatives.push('Trudność z koncentracją po spadku wyniku');

  // Zegar na doublach
  if (has(data.DOUBLE_CLOCK_PROBLEM, 'Brak problemów / płynne przechodzenie tarczy'))
    positives.push('Zegar na doublach bez większych problemów');
  if (has(data.DOUBLE_CLOCK_PROBLEM, 'Seryjne pudła na zewnątrz tarczy'))
    negatives.push('Seryjne pudła obok dubli');
  if (has(data.DOUBLE_CLOCK_PROBLEM, 'Problem z dublami na dole tarczy'))
    negatives.push('Trudność z dolnymi dublami (D3, D19, D7, D17)');
  if (has(data.DOUBLE_CLOCK_PROBLEM, 'Zacinanie się na jednym dublu'))
    negatives.push('Zacinanie się na jednym dublu');
  if (has(data.DOUBLE_CLOCK_PROBLEM, 'Trudność z płynnym PRZESTAWIANIEM SIĘ na oche'))
    negatives.push('Trudność z przestawianiem kąta rzutu');

  // Gra 170
  if (has(data.GAME170_PROBLEM, 'Brak problemów / szybkie zamykanie w niewielu podejściach'))
    positives.push('Gra 170 bez większych problemów');
  if (has(data.GAME170_PROBLEM, 'Brak pierwszej lotki w T20'))
    negatives.push('Trudność z wejściem w T20');
  if (has(data.GAME170_PROBLEM, 'Asekuracyjne rzuty w duże pola'))
    negatives.push('Zbyt zachowawcze rzuty w potrójne');
  if (has(data.GAME170_PROBLEM, 'Gubienie się w optymalnej ścieżce wyjścia'))
    negatives.push('Trudność z wyliczeniem kombinacji');
  if (has(data.GAME170_PROBLEM, 'Spadek skuteczności na dublu kończącym'))
    negatives.push('Spadek celności na dublu kończącym');

  // Mental
  if (has(data.STRESS_SIMULATION, 'Pełny spokój / brak reakcji emocjonalnej'))
    positives.push('Pełny spokój podczas symulacji stresu');
  if (has(data.STRESS_SIMULATION, 'Odczuwalny realny stres / skok tętna'))
    negatives.push('Realny stres podczas symulacji');
  if (has(data.BREATHING_EFFECT, 'Pełny spokój i tętno w normie'))
    positives.push('Pełne wyciszenie po ćwiczeniach oddechowych');
  if (has(data.BREATHING_EFFECT, 'Nadal spięty / ciało sztywne'))
    negatives.push('Ciało wciąż spięte mimo ćwiczeń oddechowych');

  // Fatigue
  if (has(data.FATIGUE, 'Świeżość do końca'))
    positives.push('Świeżość fizyczna i mentalna do końca treningu');
  if (has(data.FATIGUE, 'Ręka / bark zmęczony'))
    negatives.push('Zmęczenie ręki/barku pod koniec treningu');
  if (has(data.FATIGUE, 'Zmęczenie psychiczne / spadek koncentracji'))
    negatives.push('Zmęczenie psychiczne pod koniec treningu');

  // Silnik diagnoz - matching sektor + problemy
  let summary_title = 'Solidna sesja treningowa';
  let coach_advice = 'Trening przebiegł bez większych zastrzeżeń - kontynuuj w tym stylu i stopniowo podnoś poprzeczkę.';

  // DOUBLE - D20/D10/D5
  if (has(data.HARD_SECTOR_DOUBLE, 'D20 / D10 / D5 (Góra / Prawo)')) {
    if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)')) {
      summary_title = 'Solidny trening z potrzebą korekty pozycji łokcia';
      coach_advice = 'Celując w D20, D10 i D5, utrzymuj łokieć w stałym punkcie. Przy przejściu z D20 niżej na D10 i D5 koryguj wysokość rzutu wyłącznie delikatnym obniżeniem tułowia w biodrze, a nie opuszczaniem ręki w łokciu.';
    } else if (has(data.MECHANICS_ISSUE, 'Powyżej celu (przepchnięcie lotki / zbyt późne otwarcie dłoni)')) {
      summary_title = 'Solidny trening z potrzebą korekty wypuszczenia';
      coach_advice = 'Rzucanie powyżej D20/D10 oznacza przetrzymanie lotki w palcach lub nadrabianie siłą z barku. Rozluźnij chwyt, zredukuj dynamikę i pozwól lotce swobodnie wylecieć z dłoni w najwyższym punkcie łuku rzutu.';
    } else if (has(data.MECHANICS_ISSUE, 'Ściąganie w lewo/prawo (uciekanie łokcia z osi / obrót tułowia)')) {
      summary_title = 'Solidny trening z potrzebą pracy nad osiowością';
      coach_advice = 'Ściąganie lotek w bok przy D20/D10 oznacza zbaczanie przedramienia z toru rzutu. Po wypuszczeniu lotki dopilnuj, aby dłoń i wyprostowane palce zostawały skierowane pionowo w cel. Sprawdź, czy stopa na oche jest stabilna.';
    } else if (has(data.MECHANICS_ISSUE, 'Niestabilna postawa / utrata balansu na oche')) {
      summary_title = 'Solidny trening z potrzebą pracy nad stabilnością';
      coach_advice = 'Niestabilność na oche destabilizuje rzut w D20 i D10. Zablokuj ciężar ciała na pięcie stopy wykrocznej. Zmiana sekwencji z D20 na D5 nie może zmieniać punktu ciężkości Twojej postawy.';
    } else if (has(data.MECHANICS_ISSUE, 'Różna wysokość rzutów w jednej serii (tzw. "drabinka")')) {
      summary_title = 'Solidny trening z potrzebą pracy nad powtarzalnością';
      coach_advice = 'Drabinka na D20/D10/D5 to znak nierównej siły lub zmiennego chwytu. Przed każdym rzutem w serii wykonaj powtarzalny, identyczny zamach i upewnij się, że chwytasz lotkę dokładnie w tym samym miejscu.';
    }
  }
  // DOUBLE - D16/D8/D4
  else if (has(data.HARD_SECTOR_DOUBLE, 'D16 / D8 / D4 (Lewa strona)')) {
    if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)')) {
      summary_title = 'Solidny trening z potrzebą korekty na lewej stronie';
      coach_advice = 'Przechodząc z D16 na D8 i D4, nie obniżaj ręki. Zablokuj łokieć na stałej wysokości i obniżaj pozycję wyłącznie poprzez pochylenie w biodrze.';
    } else if (has(data.MECHANICS_ISSUE, 'Ściąganie w lewo/prawo (uciekanie łokcia z osi / obrót tułowia)')) {
      summary_title = 'Solidny trening z potrzebą korekty kąta na oche';
      coach_advice = 'Ściąganie przy D16/D8/D4 wynika z braku korekty pozycji na oche. Przesuń się minimalnie w lewo na linii oche lub lekko otwórz biodro, aby ręka wypychała lotkę wprost na sektor bez załamywania w łokciu.';
    }
  }
  // DOUBLE - Bullseye
  else if (has(data.HARD_SECTOR_DOUBLE, 'Bullseye (Środek tarczy)')) {
    if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)')) {
      summary_title = 'Solidny trening z potrzebą korekty na Bulla';
      coach_advice = 'Pudłowanie poniżej Bulla to efekt \'skracania\' rzutu. Dokończ wyprost ręki z pełną pewnością siebie, wypychając lotkę wprost w czerwony środek.';
    } else if (has(data.MECHANICS_ISSUE, 'Ściąganie w lewo/prawo (uciekanie łokcia z osi / obrót tułowia)')) {
      summary_title = 'Solidny trening z potrzebą pracy nad osiowością na Bulla';
      coach_advice = 'Przy rzucie w Bullseye Twoje przedramię musi pracować jak tłok w jednej płaszczyźnie. Dopilnuj, by palce po wyproście wskazywały idealnie w środek tarczy.';
    }
  }
  // TRIPLE - T20
  else if (has(data.HARD_SECTOR_TRIPLE, 'Triple 20 (Góra tarczy)')) {
    if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)')) {
      summary_title = 'Solidny trening z potrzebą korekty na T20';
      coach_advice = 'Celując w T20, utrzymuj łokieć na stałej wysokości. Koryguj trajektorię wyłącznie delikatnym pochyleniem tułowia, a nie opuszczaniem przedramienia.';
    } else if (has(data.MECHANICS_ISSUE, 'Ciasne rzuty, ale w pojedynczą wartość (blokowanie się na drutach T20/T19)')) {
      summary_title = 'Solidny trening - druty do dopracowania';
      coach_advice = 'Ciasne rzuty na drutach T20 to oznaka dobrej linii, ale zbyt dużego napięcia. Rozluźnij nadgarstek i pozwól lotce swobodniej wylecieć z palców.';
    }
  }
  // TRIPLE - T19
  else if (has(data.HARD_SECTOR_TRIPLE, 'Triple 19 (Dół tarczy)')) {
    if (has(data.MECHANICS_ISSUE, 'Poniżej celu (spadek łokcia / zbyt szybkie opadnięcie ręki)')) {
      summary_title = 'Solidny trening z potrzebą korekty na T19';
      coach_advice = 'T19 wymaga niższego łokcia niż T20, ale nadal stabilnego. Zablokuj łokieć i pochyl tułów minimalnie bardziej do przodu.';
    }
  }
  // Finishing 50 - konkretne porady
  else if (has(data.FINISHING50_PROBLEM, 'Nietrafianie dubla w pierwszej serii')) {
    summary_title = 'Dobra forma techniczna, start gry do dopracowania';
    coach_advice = 'Start w Finishing 50 wymaga trafienia dokładnie D25 lub D20. Zanim zaczniesz grę, wykonaj 3-5 rzutów rozgrzewkowych czysto w ten jeden segment, żeby ustawić rękę na konkretną wysokość przed pierwszym podejściem.';
  } else if (has(data.FINISHING50_PROBLEM, 'Trudność z powrotem do skupienia po spadku punktowym')) {
    summary_title = 'Dobra forma techniczna, odporność psychiczna do dopracowania';
    coach_advice = 'Cofanie się o 1 punkt po nietrafieniu bywa frustrujące, ale to naturalna część tej gry. Traktuj każde cofnięcie jako element treningu cierpliwości, nie porażkę.';
  }
  // Zegar na doublach
  else if (has(data.DOUBLE_CLOCK_PROBLEM, 'Problem z dublami na dole tarczy')) {
    summary_title = 'Dobra forma techniczna, dolne duble do dopracowania';
    coach_advice = 'Dolne duble (D3, D19, D7, D17) wymagają niższego łokcia i większego pochylenia. Ćwicz osobno tę sekcję tarczy przed głównym treningiem.';
  }
  // Gra 170
  else if (has(data.GAME170_PROBLEM, 'Brak pierwszej lotki w T20')) {
    summary_title = 'Dobra forma techniczna, wejście w T20 do dopracowania';
    coach_advice = 'W Grze 170 pierwsza lotka w T20 jest kluczowa. Nie spiesz się - wykonaj pełny zamach i skup się na płynnym wypuszczeniu, a nie na sile.';
  } else if (has(data.GAME170_PROBLEM, 'Asekuracyjne rzuty w duże pola')) {
    summary_title = 'Dobra forma techniczna, śmiałość rzutu do dopracowania';
    coach_advice = 'Duża liczba podejść może wynikać z zbyt zachowawczego celowania. Śmielej celuj w triple zamiast bezpiecznych pojedynczych pól - to jedyny sposób, żeby realnie skrócić liczbę rund.';
  }
  // Mental
  else if (has(data.BODY_STATE, 'Mięskie zimne / spięte') && has(data.RELEASE_FEEL, 'Ręka spięta / zrywanie rzutu')) {
    summary_title = 'Trening zaburzony niewystarczającą rozgrzewką';
    coach_advice = 'Zrywanie rzutu na początku treningu wynika z niegotowych mięśni. Wydłuż rozgrzewkę o 5 minut i rzucaj luźno w środek tarczy, bez celowania w konkretne sektory, aż poczujesz pełną płynność w łokciu i barku.';
  } else if (has(data.FATIGUE, 'Ręka / bark zmęczony') || has(data.FATIGUE, 'Zmęczenie psychiczne / spadek koncentracji')) {
    summary_title = 'Solidny trening, uważaj na przetrenowanie';
    coach_advice = 'Gdy dłoń i bark się męczą, zaczynasz nadrabiać siłą i utrwalasz złe nawyki. Następnym razem wybierz wariant krótki (75 min) lub zrób 3-minutową przerwę na rozciąganie i wodę w połowie sesji.';
  }
  // Perfekcyjny trening
  else if (
    (data.OVERALL_SCORE ?? 0) >= 8 &&
    has(data.MECHANICS_ISSUE, 'Brak problemów / wysoka powtarzalność')
  ) {
    summary_title = 'Perfekcyjna jednostka treningowa!';
    coach_advice = 'Doskonała jednostka treningowa! Wszystkie elementy - od płynności rzutu po kontrolę emocji - zagrały idealnie. Zapamiętaj to odczucie luzu w ręce i przenieś je na najbliższy mecz ligowy!';
  }

  return {
    score: data.OVERALL_SCORE ?? 0,
    summary_title,
    positives,
    negatives,
    coach_advice,
  };
}
