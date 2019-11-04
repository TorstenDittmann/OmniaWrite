<script>
    function rNr() {
        return Math.floor(Math.random() * 100000);
    }

    function importSampleData() {
        let projectId = Math.floor(Math.random() * 100000);
        let ch1 = rNr();
        let ch2 = rNr();
        let ch3 = rNr();
        let ch4 = rNr();
        const dummyScenes = [{
                id: rNr(),
                chapter: ch1,
                title: 'Scene I',
                order: 1,
                content: 'It is true that I have sent six bullets through the head of my best friend, and yet I hope to shew by this statement that I am not his murderer. At first I shall be called a madman—madder than the man I shot in his cell at the Arkham Sanitarium. Later some of my readers will weigh each statement, correlate it with the known facts, and ask themselves how I could have believed otherwise than as I did after facing the evidence of that horror—that thing on the doorstep.<div><div>Until then I also saw nothing but madness in the wild tales I have acted on. Even now I ask myself whether I was misled—or whether I am not mad after all. I do not know—but others have strange things to tell of Edward and Asenath Derby, and even the stolid police are at their wits’ ends to account for that last terrible visit. They have tried weakly to concoct a theory of a ghastly jest or warning by discharged servants, yet they know in their hearts that the truth is something infinitely more terrible and incredible.</div></div>'
            },
            {
                id: rNr(),
                chapter: ch1,
                title: 'Scene II',
                order: 2,
                content: 'So I say that I have not murdered Edward Derby. Rather have I avenged him, and in so doing purged the earth of a horror whose survival might have loosed untold terrors on all mankind. There are black zones of shadow close to our daily paths, and now and then some evil soul breaks a passage through. When that happens, the man who knows must strike before reckoning the consequences.<div>I have known Edward Pickman Derby all his life. Eight years my junior, he was so precocious that we had much in common from the time he was eight and I sixteen. He was the most phenomenal child scholar I have ever known, and at seven was writing verse of a sombre, fantastic, almost morbid cast which astonished the tutors surrounding him. Perhaps his private education and coddled seclusion had something to do with his premature flowering. An only child, he had organic weaknesses which startled his doting parents and caused them to keep him closely chained to their side. He was never allowed out without his nurse, and seldom had a chance to play unconstrainedly with other children. All this doubtless fostered a strange, secretive inner life in the boy, with imagination as his one avenue of freedom.</div>'
            },
            {
                id: rNr(),
                chapter: ch2,
                title: 'Scene VI',
                order: 1,
                content: 'Edward was thirty-eight when he met Asenath Waite. She was, I judge, about twenty-three at the time; and was taking a special course in mediaeval metaphysics at Miskatonic. The daughter of a friend of mine had met her before—in the Hall School at Kingsport—and had been inclined to shun her because of her odd reputation. She was dark, smallish, and very good-looking except for overprotuberant eyes; but something in her expression alienated extremely sensitive people. It was, however, largely her origin and conversation which caused average folk to avoid her. She was one of the Innsmouth Waites, and dark legends have clustered for generations about crumbling, half-deserted Innsmouth and its people. There are tales of horrible bargains about the year 1850, and of a strange element “not quite human” in the ancient families of the run-down fishing port—tales such as only old-time Yankees can devise and repeat with proper awesomeness.<div>Asenath’s case was aggravated by the fact that she was Ephraim Waite’s daughter—the child of his old age by an unknown wife who always went veiled. Ephraim lived in a half-decayed mansion in Washington Street, Innsmouth, and those who had seen the place (Arkham folk avoid going to Innsmouth whenever they can) declared that the attic windows were always boarded, and that strange sounds sometimes floated from within as evening drew on. The old man was known to have been a prodigious magical student in his day, and legend averred that he could raise or quell storms at sea according to his whim. I had seen him once or twice in my youth as he came to Arkham to consult forbidden tomes at the college library, and had hated his wolfish, saturnine face with its tangle of iron-grey beard. He had died insane—under rather queer circumstances—just before his daughter (by his will made a nominal ward of the principal) entered the Hall School, but she had been his morbidly avid pupil and looked fiendishly like him at times.</div><div>The friend whose daughter had gone to school with Asenath Waite repeated many curious things when the news of Edward’s acquaintance with her began to spread about. Asenath, it seemed, had posed as a kind of magician at school; and had really seemed able to accomplish some highly baffling marvels. She professed to be able to raise thunderstorms, though her seeming success was generally laid to some uncanny knack at prediction. All animals markedly disliked her, and she could make any dog howl by certain motions of her right hand. There were times when she displayed snatches of knowledge and language very singular—and very shocking—for a young girl; when she would frighten her schoolmates with leers and winks of an inexplicable kind, and would seem to extract an obscene and zestful irony from her present situation.</div>'
            },
            {
                id: rNr(),
                chapter: ch2,
                title: 'Scene VII',
                order: 2,
                content: 'Most unusual, though, were the well-attested cases of her influence over other persons. She was, beyond question, a genuine hypnotist. By gazing peculiarly at a fellow-student she would often give the latter a distinct feeling of exchanged personality—as if the subject were placed momentarily in the magician’s body and able to stare half across the room at her real body, whose eyes blazed and protruded with an alien expression. Asenath often made wild claims about the nature of consciousness and about its independence of the physical frame—or at least from the life-processes of the physical frame. Her crowning rage, however, was that she was not a man; since she believed a male brain had certain unique and far-reaching cosmic powers. Given a man’s brain, she declared, she could not only equal but surpass her father in mastery of unknown forces.<div>Edward met Asenath at a gathering of “intelligentsia” held in one of the students’ rooms, and could talk of nothing else when he came to see me the next day. He had found her full of the interests and erudition which engrossed him most, and was in addition wildly taken with her appearance. I had never seen the young woman, and recalled casual references only faintly, but I knew who she was. It seemed rather regrettable that Derby should become so upheaved about her; but I said nothing to discourage him, since infatuation thrives on opposition. He was not, he said, mentioning her to his father.</div><div>In the next few weeks I heard of very little but Asenath from young Derby. Others now remarked Edward’s autumnal gallantry, though they agreed that he did not look even nearly his actual age, or seem at all inappropriate as an escort for his bizarre divinity. He was only a trifle paunchy despite his indolence and self-indulgence, and his face was absolutely without lines. Asenath, on the other hand, had the premature crow’s feet which come from the exercise of an intense will.</div><div>About this time Edward brought the girl to call on me, and I at once saw that his interest was by no means one-sided. She eyed him continually with an almost predatory air, and I perceived that their intimacy was beyond untangling. Soon afterward I had a visit from old Mr. Derby, whom I had always admired and respected. He had heard the tales of his son’s new friendship, and had wormed the whole truth out of “the boy”. Edward meant to marry Asenath, and had even been looking at houses in the suburbs. Knowing my usually great influence with his son, the father wondered if I could help to break the ill-advised affair off; but I regretfully expressed my doubts. This time it was not a question of Edward’s weak will but of the woman’s strong will. The perennial child had transferred his dependence from the parental image to a new and stronger image, and nothing could be done about it.</div>'
            },
            {
                id: rNr(),
                chapter: ch1,
                title: 'Scene III',
                order: 3,
                content: 'At any rate, his juvenile learning was prodigious and bizarre; and his facile writings such as to captivate me despite my greater age. About that time I had leanings toward art of a somewhat grotesque cast, and I found in this younger child a rare kindred spirit. What lay behind our joint love of shadows and marvels was, no doubt, the ancient, mouldering, and subtly fearsome town in which we lived—witch-cursed, legend-haunted Arkham, whose huddled, sagging gambrel roofs and crumbling Georgian balustrades brood out the centuries beside the darkly muttering Miskatonic.<div>As time went by I turned to architecture and gave up my design of illustrating a book of Edward’s daemoniac poems, yet our comradeship suffered no lessening. Young Derby’s odd genius developed remarkably, and in his eighteenth year his collected nightmare-lyrics made a real sensation when issued under the title Azathoth and Other Horrors. He was a close correspondent of the notorious Baudelairean poet Justin Geoffrey, who wrote The People of the Monolith and died screaming in a madhouse in 1926 after a visit to a sinister, ill-regarded village in Hungary.</div><div>In self-reliance and practical affairs, however, Derby was greatly retarded because of his coddled existence. His health had improved, but his habits of childish dependence were fostered by overcareful parents; so that he never travelled alone, made independent decisions, or assumed responsibilities. It was early seen that he would not be equal to a struggle in the business or professional arena, but the family fortune was so ample that this formed no tragedy. As he grew to years of manhood he retained a deceptive aspect of boyishness. Blond and blue-eyed, he had the fresh complexion of a child; and his attempts to raise a moustache were discernible only with difficulty. His voice was soft and light, and his pampered, unexercised life gave him a juvenile chubbiness rather than the paunchiness of premature middle age. He was of good height, and his handsome face would have made him a notable gallant had not his shyness held him to seclusion and bookishness.</div>'
            },
            {
                id: rNr(),
                chapter: ch1,
                title: 'Scene IV',
                order: 3,
                content: 'Derby’s parents took him abroad every summer, and he was quick to seize on the surface aspects of European thought and expression. His Poe-like talents turned more and more toward the decadent, and other artistic sensitivenesses and yearnings were half-aroused in him. We had great discussions in those days. I had been through Harvard, had studied in a Boston architect’s office, had married, and had finally returned to Arkham to practice my profession—settling in the family homestead in Saltonstall St. since my father had moved to Florida for his health. Edward used to call almost every evening, till I came to regard him as one of the household. He had a characteristic way of ringing the doorbell or sounding the knocker that grew to be a veritable code signal, so that after dinner I always listened for the familiar three brisk strokes followed by two more after a pause. Less frequently I would visit at his house and note with envy the obscure volumes in his constantly growing library.<div>Derby went through Miskatonic University in Arkham, since his parents would not let him board away from them. He entered at sixteen and completed his course in three years, majoring in English and French literature and receiving high marks in everything but mathematics and the sciences. He mingled very little with the other students, though looking enviously at the “daring” or “Bohemian” set—whose superficially “smart” language and meaninglessly ironic pose he aped, and whose dubious conduct he wished he dared adopt.</div><div>What he did do was to become an almost fanatical devotee of subterranean magical lore, for which Miskatonic’s library was and is famous. Always a dweller on the surface of phantasy and strangeness, he now delved deep into the actual runes and riddles left by a fabulous past for the guidance or puzzlement of posterity. He read things like the frightful Book of Eibon, the Unaussprechlichen Kulten of von Junzt, and the forbidden Necronomicon of the mad Arab Abdul Alhazred, though he did not tell his parents he had seen them. Edward was twenty when my son and only child was born, and seemed pleased when I named the newcomer Edward Derby Upton, after him.</div>'
            },
            {
                id: rNr(),
                chapter: ch1,
                title: 'Scene V',
                order: 3,
                content: 'By the time he was twenty-five Edward Derby was a prodigiously learned man and a fairly well-known poet and fantaisiste, though his lack of contacts and responsibilities had slowed down his literary growth by making his products derivative and overbookish. I was perhaps his closest friend—finding him an inexhaustible mine of vital theoretical topics, while he relied on me for advice in whatever matters he did not wish to refer to his parents. He remained single—more through shyness, inertia, and parental protectiveness than through inclination—and moved in society only to the slightest and most perfunctory extent. When the war came both health and ingrained timidity kept him at home. I went to Plattsburg for a commission, but never got overseas.<div>So the years wore on. Edward’s mother died when he was thirty-four, and for months he was incapacitated by some odd psychological malady. His father took him to Europe, however, and he managed to pull out of his trouble without visible effects. Afterward he seemed to feel a sort of grotesque exhilaration, as if of partial escape from some unseen bondage. He began to mingle in the more “advanced” college set despite his middle age, and was present at some extremely wild doings—on one occasion paying heavy blackmail (which he borrowed of me) to keep his presence at a certain affair from his father’s notice. Some of the whispered rumours about the wild Miskatonic set were extremely singular. There was even talk of black magic and of happenings utterly beyond credibility.</div>'
            },
            {
                id: rNr(),
                chapter: ch2,
                title: 'Scene VII',
                order: 3,
                content: 'The wedding was performed a month later—by a justice of the peace, according to the bride’s request. Mr. Derby, at my advice, offered no opposition; and he, my wife, my son, and I attended the brief ceremony—the other guests being wild young people from the college. Asenath had bought the old Crowninshield place in the country at the end of High Street, and they proposed to settle there after a short trip to Innsmouth, whence three servants and some books and household goods were to be brought. It was probably not so much consideration for Edward and his father as a personal wish to be near the college, its library, and its crowd of “sophisticates”, that made Asenath settle in Arkham instead of returning permanently home.<div>When Edward called on me after the honeymoon I thought he looked slightly changed. Asenath had made him get rid of the undeveloped moustache, but there was more than that. He looked soberer and more thoughtful, his habitual pout of childish rebelliousness being exchanged for a look almost of genuine sadness. I was puzzled to decide whether I liked or disliked the change. Certainly, he seemed for the moment more normally adult than ever before. Perhaps the marriage was a good thing—might not the change of dependence form a start toward actual neutralisation, leading ultimately to responsible independence? He came alone, for Asenath was very busy. She had brought a vast store of books and apparatus from Innsmouth (Derby shuddered as he spoke the name), and was finishing the restoration of the Crowninshield house and grounds.</div><div>Her home in—that town—was a rather disquieting place, but certain objects in it had taught him some surprising things. He was progressing fast in esoteric lore now that he had Asenath’s guidance. Some of the experiments she proposed were very daring and radical—he did not feel at liberty to describe them—but he had confidence in her powers and intentions. The three servants were very queer—an incredibly aged couple who had been with old Ephraim and referred occasionally to him and to Asenath’s dead mother in a cryptic way, and a swarthy young wench who had marked anomalies of feature and seemed to exude a perpetual odour of fish.</div>'
            },
            {
                id: rNr(),
                chapter: ch3,
                title: 'Scene IIX',
                order: 3,
                content: 'For the next two years I saw less and less of Derby. A fortnight would sometimes slip by without the familiar three-and-two strokes at the front door; and when he did call—or when, as happened with increasing infrequency, I called on him—he was very little disposed to converse on vital topics. He had become secretive about those occult studies which he used to describe and discuss so minutely, and preferred not to talk of his wife. She had aged tremendously since her marriage, till now—oddly enough—she seemed the elder of the two. Her face held the most concentratedly determined expression I had ever seen, and her whole aspect seemed to gain a vague, unplaceable repulsiveness. My wife and son noticed it as much as I, and we all ceased gradually to call on her—for which, Edward admitted in one of his boyishly tactless moments, she was unmitigatedly grateful. Occasionally the Derbys would go on long trips—ostensibly to Europe, though Edward sometimes hinted at obscurer destinations.<div>It was after the first year that people began talking about the change in Edward Derby. It was very casual talk, for the change was purely psychological; but it brought up some interesting points. Now and then, it seemed, Edward was observed to wear an expression and to do things wholly incompatible with his usual flabby nature. For example—although in the old days he could not drive a car, he was now seen occasionally to dash into or out of the old Crowninshield driveway with Asenath’s powerful Packard, handling it like a master, and meeting traffic entanglements with a skill and determination utterly alien to his accustomed nature. In such cases he seemed always to be just back from some trip or just starting on one—what sort of trip, no one could guess, although he mostly favoured the Innsmouth road.</div>'
            },
            {
                id: rNr(),
                chapter: ch3,
                title: 'Scene IX',
                order: 3,
                content: 'Oddly, the metamorphosis did not seem altogether pleasing. People said he looked too much like his wife, or like old Ephraim Waite himself, in these moments—or perhaps these moments seemed unnatural because they were so rare. Sometimes, hours after starting out in this way, he would return listlessly sprawled on the rear seat of the car while an obviously hired chauffeur or mechanic drove. Also, his preponderant aspect on the streets during his decreasing round of social contacts (including, I may say, his calls on me) was the old-time indecisive one—its irresponsible childishness even more marked than in the past. While Asenath’s face aged, Edward’s—aside from those exceptional occasions—actually relaxed into a kind of exaggerated immaturity, save when a trace of the new sadness or understanding would flash across it. It was really very puzzling. Meanwhile the Derbys almost dropped out of the gay college circle—not through their own disgust, we heard, but because something about their present studies shocked even the most callous of the other decadents.<div>It was in the third year of the marriage that Edward began to hint openly to me of a certain fear and dissatisfaction. He would let fall remarks about things ‘going too far’, and would talk darkly about the need of ‘saving his identity’. At first I ignored such references, but in time I began to question him guardedly, remembering what my friend’s daughter had said about Asenath’s hypnotic influence over the other girls at school—the cases where students had thought they were in her body looking across the room at themselves. This questioning seemed to make him at once alarmed and grateful, and once he mumbled something about having a serious talk with me later.</div><div>About this time old Mr. Derby died, for which I was afterward very thankful. Edward was badly upset, though by no means disorganised. He had seen astonishingly little of his parent since his marriage, for Asenath had concentrated in herself all his vital sense of family linkage. Some called him callous in his loss—especially since those jaunty and confident moods in the car began to increase. He now wished to move back into the old Derby mansion, but Asenath insisted on staying in the Crowninshield house, to which she had become well adjusted.</div><div>Not long afterward my wife heard a curious thing from a friend—one of the few who had not dropped the Derbys. She had been out to the end of High St. to call on the couple, and had seen a car shoot briskly out of the drive with Edward’s oddly confident and almost sneering face above the wheel. Ringing the bell, she had been told by the repulsive wench that Asenath was also out; but had chanced to look up at the house in leaving. There, at one of Edward’s library windows, she had glimpsed a hastily withdrawn face—a face whose expression of pain, defeat, and wistful hopelessness was poignant beyond description. It was—incredibly enough in view of its usual domineering cast—Asenath’s; yet the caller had vowed that in that instant the sad, muddled eyes of poor Edward were gazing out from it.</div>'
            },
            {
                id: rNr(),
                chapter: ch3,
                title: 'Scene X',
                order: 3,
                content: 'Edward’s calls now grew a trifle more frequent, and his hints occasionally became concrete. What he said was not to be believed, even in centuried and legend-haunted Arkham; but he threw out his dark lore with a sincerity and convincingness which made one fear for his sanity. He talked about terrible meetings in lonely places, of Cyclopean ruins in the heart of the Maine woods beneath which vast staircases lead down to abysses of nighted secrets, of complex angles that lead through invisible walls to other regions of space and time, and of hideous exchanges of personality that permitted explorations in remote and forbidden places, on other worlds, and in different space-time continua.<div>He would now and then back up certain crazy hints by exhibiting objects which utterly nonplussed me—elusively coloured and bafflingly textured objects like nothing ever heard of on earth, whose insane curves and surfaces answered no conceivable purpose and followed no conceivable geometry. These things, he said, came ‘from outside’; and his wife knew how to get them. Sometimes—but always in frightened and ambiguous whispers—he would suggest things about old Ephraim Waite, whom he had seen occasionally at the college library in the old days. These adumbrations were never specific, but seemed to revolve around some especially horrible doubt as to whether the old wizard were really dead—in a spiritual as well as corporeal sense.</div><div>At times Derby would halt abruptly in his revelations, and I wondered whether Asenath could possibly have divined his speech at a distance and cut him off through some unknown sort of telepathic mesmerism—some power of the kind she had displayed at school. Certainly, she suspected that he told me things, for as the weeks passed she tried to stop his visits with words and glances of a most inexplicable potency. Only with difficulty could he get to see me, for although he would pretend to be going somewhere else, some invisible force would generally clog his motions or make him forget his destination for the time being. His visits usually came when Asenath was away—‘away in her own body’, as he once oddly put it. She always found out later—the servants watched his goings and comings—but evidently she thought it inexpedient to do anything drastic.</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XI',
                order: 3,
                content: 'Derby had been married more than three years on that August day when I got the telegram from Maine. I had not seen him for two months, but had heard he was away “on business”. Asenath was supposed to be with him, though watchful gossips declared there was someone upstairs in the house behind the doubly curtained windows. They had watched the purchases made by the servants. And now the town marshal of Chesuncook had wired of the draggled madman who stumbled out of the woods with delirious ravings and screamed to me for protection. It was Edward—and he had been just able to recall his own name and my name and address.<div>Chesuncook is close to the wildest, deepest, and least explored forest belt in Maine, and it took a whole day of feverish jolting through fantastic and forbidding scenery to get there in a car. I found Derby in a cell at the town farm, vacillating between frenzy and apathy. He knew me at once, and began pouring out a meaningless, half-incoherent torrent of words in my direction.</div><div>“Dan—for God’s sake! The pit of the shoggoths! Down the six thousand steps . . . the abomination of abominations . . . I never would let her take me, and then I found myself there. . . . Iä! Shub-Niggurath! . . . The shape rose up from the altar, and there were 500 that howled. . . . The Hooded Thing bleated ‘Kamog! Kamog!’—that was old Ephraim’s secret name in the coven. . . . I was there, where she promised she wouldn’t take me. . . . A minute before I was locked in the library, and then I was there where she had gone with my body—in the place of utter blasphemy, the unholy pit where the black realm begins and the watcher guards the gate. . . . I saw a shoggoth—it changed shape. . . . I can’t stand it. . . . I won’t stand it. . . . I’ll kill her if she ever sends me there again. . . . I’ll kill that entity . . . her, him, it . . . I’ll kill it! I’ll kill it with my own hands!”</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XII',
                order: 3,
                content: 'It took me an hour to quiet him, but he subsided at last. The next day I got him decent clothes in the village, and set out with him for Arkham. His fury of hysteria was spent, and he was inclined to be silent; though he began muttering darkly to himself when the car passed through Augusta—as if the sight of a city aroused unpleasant memories. It was clear that he did not wish to go home; and considering the fantastic delusions he seemed to have about his wife—delusions undoubtedly springing from some actual hypnotic ordeal to which he had been subjected—I thought it would be better if he did not. I would, I resolved, put him up myself for a time; no matter what unpleasantness it would make with Asenath. Later I would help him get a divorce, for most assuredly there were mental factors which made this marriage suicidal for him. When we struck open country again Derby’s muttering faded away, and I let him nod and drowse on the seat beside me as I drove.<div>During our sunset dash through Portland the muttering commenced again, more distinctly than before, and as I listened I caught a stream of utterly insane drivel about Asenath. The extent to which she had preyed on Edward’s nerves was plain, for he had woven a whole set of hallucinations around her. His present predicament, he mumbled furtively, was only one of a long series. She was getting hold of him, and he knew that some day she would never let go. Even now she probably let him go only when she had to, because she couldn’t hold on long at a time. She constantly took his body and went to nameless places for nameless rites, leaving him in her body and locking him upstairs—but sometimes she couldn’t hold on, and he would find himself suddenly in his own body again in some far-off, horrible, and perhaps unknown place. Sometimes she’d get hold of him again and sometimes she couldn’t. Often he was left stranded somewhere as I had found him . . . time and again he had to find his way home from frightful distances, getting somebody to drive the car after he found it.</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XIIV',
                order: 3,
                content: 'The worst thing was that she was holding on to him longer and longer at a time. She wanted to be a man—to be fully human—that was why she got hold of him. She had sensed the mixture of fine-wrought brain and weak will in him. Some day she would crowd him out and disappear with his body—disappear to become a great magician like her father and leave him marooned in that female shell that wasn’t even quite human. Yes, he knew about the Innsmouth blood now. There had been traffick with things from the sea—it was horrible. . . . And old Ephraim—he had known the secret, and when he grew old did a hideous thing to keep alive . . . he wanted to live forever . . . Asenath would succeed—one successful demonstration had taken place already.<div>As Derby muttered on I turned to look at him closely, verifying the impression of change which an earlier scrutiny had given me. Paradoxically, he seemed in better shape than usual—harder, more normally developed, and without the trace of sickly flabbiness caused by his indolent habits. It was as if he had been really active and properly exercised for the first time in his coddled life, and I judged that Asenath’s force must have pushed him into unwonted channels of motion and alertness. But just now his mind was in a pitiable state; for he was mumbling wild extravagances about his wife, about black magic, about old Ephraim, and about some revelation which would convince even me. He repeated names which I recognised from bygone browsings in forbidden volumes, and at times made me shudder with a certain thread of mythological consistency—of convincing coherence—which ran through his maundering. Again and again he would pause, as if to gather courage for some final and terrible disclosure.</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XIV',
                order: 3,
                content: '“Dan, Dan, don’t you remember him—the wild eyes and the unkempt beard that never turned white? He glared at me once, and I never forgot it. Now she glares that way. And I know why! He found it in the Necronomicon—the formula. I don’t dare tell you the page yet, but when I do you can read and understand. Then you will know what has engulfed me. On, on, on, on—body to body to body—he means never to die. The life-glow—he knows how to break the link . . . it can flicker on a while even when the body is dead. I’ll give you hints, and maybe you’ll guess. Listen, Dan—do you know why my wife always takes such pains with that silly backhand writing? Have you ever seen a manuscript of old Ephraim’s? Do you want to know why I shivered when I saw some hasty notes Asenath had jotted down?<div>“Asenath . . . is there such a person? Why did they half think there was poison in old Ephraim’s stomach? Why do the Gilmans whisper about the way he shrieked—like a frightened child—when he went mad and Asenath locked him up in the padded attic room where—the other—had been? Was it old Ephraim’s soul that was locked in? Who locked in whom? Why had he been looking for months for someone with a fine mind and a weak will? Why did he curse that his daughter wasn’t a son? Tell me, Daniel Upton—what devilish exchange was perpetrated in the house of horror where that blasphemous monster had his trusting, weak-willed, half-human child at his mercy? Didn’t he make it permanent—as she’ll do in the end with me? Tell me why that thing that calls itself Asenath writes differently when off guard, so that you can’t tell its script from . . .”</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XV',
                order: 3,
                content: 'Then the thing happened. Derby’s voice was rising to a thin treble scream as he raved, when suddenly it was shut off with an almost mechanical click. I thought of those other occasions at my home when his confidences had abruptly ceased—when I had half fancied that some obscure telepathic wave of Asenath’s mental force was intervening to keep him silent. This, though, was something altogether different—and, I felt, infinitely more horrible. The face beside me was twisted almost unrecognisably for a moment, while through the whole body there passed a shivering motion—as if all the bones, organs, muscles, nerves, and glands were readjusting themselves to a radically different posture, set of stresses, and general personality.<div>Just where the supreme horror lay, I could not for my life tell; yet there swept over me such a swamping wave of sickness and repulsion—such a freezing, petrifying sense of utter alienage and abnormality—that my grasp of the wheel grew feeble and uncertain. The figure beside me seemed less like a lifelong friend than like some monstrous intrusion from outer space—some damnable, utterly accursed focus of unknown and malign cosmic forces.</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XVI',
                order: 3,
                content: 'I had faltered only a moment, but before another moment was over my companion had seized the wheel and forced me to change places with him. The dusk was now very thick, and the lights of Portland far behind, so I could not see much of his face. The blaze of his eyes, though, was phenomenal; and I knew that he must now be in that queerly energised state—so unlike his usual self—which so many people had noticed. It seemed odd and incredible that listless Edward Derby—he who could never assert himself, and who had never learned to drive—should be ordering me about and taking the wheel of my own car, yet that was precisely what had happened. He did not speak for some time, and in my inexplicable horror I was glad he did not.<div>In the lights of Biddeford and Saco I saw his firmly set mouth, and shivered at the blaze of his eyes. The people were right—he did look damnably like his wife and like old Ephraim when in these moods. I did not wonder that the moods were disliked—there was certainly something unnatural and diabolic in them, and I felt the sinister element all the more because of the wild ravings I had been hearing. This man, for all my lifelong knowledge of Edward Pickman Derby, was a stranger—an intrusion of some sort from the black abyss.</div><div>He did not speak until we were on a dark stretch of road, and when he did his voice seemed utterly unfamiliar. It was deeper, firmer, and more decisive than I had ever known it to be; while its accent and pronunciation were altogether changed—though vaguely, remotely, and rather disturbingly recalling something I could not quite place. There was, I thought, a trace of very profound and very genuine irony in the timbre—not the flashy, meaninglessly jaunty pseudo-irony of the callow “sophisticate”, which Derby had habitually affected, but something grim, basic, pervasive, and potentially evil. I marvelled at the self-possession so soon following the spell of panic-struck muttering.</div>'
            },
            {
                id: rNr(),
                chapter: ch4,
                title: 'Scene XVII',
                order: 3,
                content: '“I hope you’ll forget my attack back there, Upton,” he was saying. “You know what my nerves are, and I guess you can excuse such things. I’m enormously grateful, of course, for this lift home.\n     “And you must forget, too, any crazy things I may have been saying about my wife—and about things in general. That’s what comes from overstudy in a field like mine. My philosophy is full of bizarre concepts, and when the mind gets worn out it cooks up all sorts of imaginary concrete applications. I shall take a rest from now on—you probably won’t see me for some time, and you needn’t blame Asenath for it.<div>“This trip was a bit queer, but it’s really very simple. There are certain Indian relics in the north woods—standing stones, and all that—which mean a good deal in folklore, and Asenath and I are following that stuff up. It was a hard search, so I seem to have gone off my head. I must send somebody for the car when I get home. A month’s relaxation will put me back on my feet.”\n     I do not recall just what my own part of the conversation was, for the baffling alienage of my seatmate filled all my consciousness. With every moment my feeling of elusive cosmic horror increased, till at length I was in a virtual delirium of longing for the end of the drive. Derby did not offer to relinquish the wheel, and I was glad of the speed with which Portsmouth and Newburyport flashed by.</div><div>At the junction where the main highway runs inland and avoids Innsmouth I was half afraid my driver would take the bleak shore road that goes through that damnable place. He did not, however, but darted rapidly past Rowley and Ipswich toward our destination. We reached Arkham before midnight, and found the lights still on at the old Crowninshield house. Derby left the car with a hasty repetition of his thanks, and I drove home alone with a curious feeling of relief. It had been a terrible drive—all the more terrible because I could not quite tell why—and I did not regret Derby’s forecast of a long absence from my company.</div>'
            }
        ];

        let projectsData = JSON.parse(localStorage.getItem("projects"));

        projectsData = projectsData.concat([{
            "id": projectId,
            "title": "Mountains of Madness"
        }]);
        localStorage.setItem('projects', JSON.stringify(projectsData));

        let tabsData = JSON.parse(localStorage.getItem("tabs"));
        tabsData = tabsData.concat([{
            "id": rNr(),
            "title": "Chapter I - Scene II",
            "project": projectId,
            "link": "/write/4568"
        }, {
            "id": rNr(),
            "title": "Chapter II - Scene I",
            "project": projectId,
            "link": "/write/4569"
        }]);
        localStorage.setItem('tabs', JSON.stringify(tabsData));

        localStorage.setItem('state', JSON.stringify({
            "currentProject": projectId,
            "currentUser": "tdittmann-242",
            "currentTitle": ""
        }));

        let chaptersData = JSON.parse(localStorage.getItem("chapters"));
        chaptersData = chaptersData.concat([{
            "id": ch1,
            "project": projectId,
            "title": "Chapter 1",
            "order": 1,
            "ui": {
                "open": true
            }
        }, {
            "id": ch2,
            "project": projectId,
            "title": "Chapter 2",
            "order": 2,
            "ui": {
                "open": true
            }
        }, {
            "id": ch3,
            "project": projectId,
            "title": "Chapter 3",
            "order": 3,
            "ui": {
                "open": true
            }
        }, {
            "id": ch4,
            "project": projectId,
            "title": "Chapter 4",
            "order": 2,
            "ui": {
                "open": true
            }
        }]);
        localStorage.setItem('chapters', JSON.stringify(chaptersData));

        let scenesData = JSON.parse(localStorage.getItem("scenes"));
        scenesData = scenesData.concat(dummyScenes);
        localStorage.setItem('scenes', JSON.stringify(scenesData));
    }
</script>

<button on:click={importSampleData}>importSampleData</button>