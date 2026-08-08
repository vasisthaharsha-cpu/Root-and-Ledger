/* ---------------------------------------------------------
           NAVIGATION
        --------------------------------------------------------- */
        const chapterMeta = {
            'living-world': { title: 'The Living World', crumb: 'Unit 1 · Class XI · Chapter 01' },
            'biological-classification': { title: 'Biological Classification', crumb: 'Unit 1 · Class XI · Chapter 02' },
            'cell-unit-of-life': { title: 'Cell: The Unit of Life', crumb: 'Unit 3 · Class XI · Chapter 08' },
        };
        let currentChapterId = 'living-world';

        function go(page) {
            ['intro', 'syllabus', 'chapter', 'quiz'].forEach(p => {
                document.getElementById('page-' + p).hidden = (p !== page);
            });
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        function openChapter(id) {
            if (!chapterMeta[id]) { go('syllabus'); return; }
            currentChapterId = id;
            document.querySelectorAll('.chapter-body').forEach(el => {
                el.hidden = (el.id !== 'chbody-' + id);
            });
            go('chapter');
        }
        function startQuiz() {
            const meta = chapterMeta[currentChapterId];
            document.getElementById('quiz-eyebrow').textContent = 'Self-check · ' + meta.title;
            go('quiz');
            renderQuiz();
        }

        /* ---------------------------------------------------------
           SYLLABUS DATA
        --------------------------------------------------------- */
        const class11 = {
            "Diversity in the Living World": [
                { n: 1, title: "The Living World", status: "ready", id: "living-world" },
                { n: 2, title: "Biological Classification", status: "ready", id: "biological-classification" },
                { n: 3, title: "Plant Kingdom", status: "soon" },
                { n: 4, title: "Animal Kingdom", status: "soon" },
            ],
            "Structural Organisation in Animals and Plants": [
                { n: 5, title: "Morphology of Flowering Plants", status: "soon" },
                { n: 6, title: "Anatomy of Flowering Plants", status: "soon" },
                { n: 7, title: "Structural Organisation in Animals", status: "soon" },
            ],
            "Cell Structure and Function": [
                { n: 8, title: "Cell: The Unit of Life", status: "ready", id: "cell-unit-of-life" },
                { n: 9, title: "Biomolecules", status: "soon" },
                { n: 10, title: "Cell Cycle and Cell Division", status: "soon" },
            ],
            "Plant Physiology": [
                { n: 11, title: "Transport in Plants", status: "soon" },
                { n: 12, title: "Mineral Nutrition", status: "soon" },
                { n: 13, title: "Photosynthesis in Higher Plants", status: "soon" },
                { n: 14, title: "Respiration in Plants", status: "soon" },
                { n: 15, title: "Plant Growth and Development", status: "soon" },
            ],
            "Human Physiology": [
                { n: 16, title: "Digestion and Absorption", status: "soon" },
                { n: 17, title: "Breathing and Exchange of Gases", status: "soon" },
                { n: 18, title: "Body Fluids and Circulation", status: "soon" },
                { n: 19, title: "Excretory Products and their Elimination", status: "soon" },
                { n: 20, title: "Locomotion and Movement", status: "soon" },
                { n: 21, title: "Neural Control and Coordination", status: "soon" },
                { n: 22, title: "Chemical Coordination and Integration", status: "soon" },
            ],
        };

        const class12 = {
            "Reproduction": [
                { n: 1, title: "Sexual Reproduction in Flowering Plants", status: "soon" },
                { n: 2, title: "Human Reproduction", status: "soon" },
                { n: 3, title: "Reproductive Health", status: "soon" },
            ],
            "Genetics and Evolution": [
                { n: 4, title: "Principles of Inheritance and Variation", status: "soon" },
                { n: 5, title: "Molecular Basis of Inheritance", status: "soon" },
                { n: 6, title: "Evolution", status: "soon" },
            ],
            "Biology and Human Welfare": [
                { n: 7, title: "Human Health and Disease", status: "soon" },
                { n: 8, title: "Microbes in Human Welfare", status: "soon" },
            ],
            "Biotechnology": [
                { n: 9, title: "Biotechnology: Principles and Processes", status: "soon" },
                { n: 10, title: "Biotechnology and its Applications", status: "soon" },
            ],
            "Ecology": [
                { n: 11, title: "Organisms and Populations", status: "soon" },
                { n: 12, title: "Ecosystem", status: "soon" },
                { n: 13, title: "Biodiversity and Conservation", status: "soon" },
            ],
        };

        function renderSyllabus() {
            document.getElementById('class11-content').innerHTML = renderUnits(class11);
            document.getElementById('class12-content').innerHTML = renderUnits(class12);
        }
        function renderUnits(data) {
            let html = '';
            for (const unit in data) {
                html += `<div class="unit-block"><div class="unit-title">${unit}</div><div class="chap-grid">`;
                data[unit].forEach(ch => {
                    if (ch.status === 'ready') {
                        html += `<button class="chap-btn available" onclick="openChapter('${ch.id}')">
          <span><span class="chnum">${String(ch.n).padStart(2, '0')}</span>${ch.title}</span>
          <span class="badge ready">Open</span>
        </button>`;
                    } else {
                        html += `<div class="chap-btn locked">
          <span><span class="chnum">${String(ch.n).padStart(2, '0')}</span>${ch.title}</span>
          <span class="badge soon">Coming soon</span>
        </div>`;
                    }
                });
                html += `</div></div>`;
            }
            return html;
        }
        function switchTab(cls) {
            document.getElementById('tab-11').classList.toggle('active', cls === 11);
            document.getElementById('tab-12').classList.toggle('active', cls === 12);
            document.getElementById('class11-content').hidden = (cls !== 11);
            document.getElementById('class12-content').hidden = (cls !== 12);
        }
        renderSyllabus();

        /* ---------------------------------------------------------
           QUIZ DATA + LOGIC
        --------------------------------------------------------- */
        const quizBank = {
            'living-world': [
                { q: "Which of the following is considered the most defining feature of living organisms?", opts: ["Growth alone", "Reproduction alone", "Metabolism together with consciousness", "Cellular organisation alone"], correct: 2, why: "Metabolism is unique to living systems, and consciousness (response to stimuli) rounds out the definition — neither alone is fully sufficient." },
                { q: "Growth in plants continues throughout life mainly because of:", opts: ["Continuous cell division at meristems", "Accumulation of material on the surface", "Constant reproduction", "Metabolism alone"], correct: 0, why: "Meristematic tissue keeps dividing throughout a plant's life, unlike most animal growth which stops after a point." },
                { q: "Which of these is alive but does NOT reproduce?", opts: ["Amoeba", "A mule", "Bacteria", "Housefly"], correct: 1, why: "Mules are sterile hybrids — alive, but incapable of reproduction, showing reproduction isn't a universal defining feature." },
                { q: "The sum total of all chemical reactions occurring in the body is called:", opts: ["Digestion", "Metabolism", "Respiration", "Nutrition"], correct: 1, why: "Metabolism is the sum of all biochemical reactions occurring simultaneously within a living cell or organism." },
                { q: "Who introduced the system of binomial nomenclature?", opts: ["Charles Darwin", "Robert Whittaker", "Carolus Linnaeus", "Ernst Mayr"], correct: 2, why: "Carolus Linnaeus introduced binomial nomenclature, using two-part Latinised names for species." },
                { q: "In the scientific name Mangifera indica, the word indica represents the:", opts: ["Genus", "Family", "Specific epithet", "Order"], correct: 2, why: "The second word in a binomial name is always the specific epithet — here, indica." },
                { q: "As per the universal rules of nomenclature, biological names are usually:", opts: ["In English, written in bold", "In Latin, written in italics", "In Sanskrit, underlined only", "In Greek, written in capitals"], correct: 1, why: "Biological names are Latinised (or treated as Latin) and printed in italics, or underlined when handwritten." },
                { q: "Which is the correct taxonomic sequence from largest to smallest category?", opts: ["Kingdom → Phylum → Class → Order → Family → Genus → Species", "Kingdom → Class → Phylum → Family → Order → Species → Genus", "Phylum → Kingdom → Order → Class → Genus → Family → Species", "Kingdom → Phylum → Order → Class → Family → Species → Genus"], correct: 0, why: "The taxonomic hierarchy runs Kingdom, Phylum/Division, Class, Order, Family, Genus, Species — broadest to narrowest." },
                { q: "The basic / lowest unit of classification is the:", opts: ["Genus", "Family", "Species", "Class"], correct: 2, why: "Species is the fundamental taxonomic category — a group of individuals with the closest resemblance and (actual or potential) interbreeding." },
                { q: "A storehouse of dried, pressed, and preserved plant specimens mounted on sheets is called a:", opts: ["Museum", "Botanical garden", "Herbarium", "Flora"], correct: 2, why: "A herbarium houses dried, pressed plant specimens on labelled sheets, arranged by an accepted classification system." },
            ],
            'biological-classification': [
                { q: "Who proposed the Five Kingdom Classification, and in which year?", opts: ["Linnaeus, 1758", "R. H. Whittaker, 1969", "Charles Darwin, 1859", "Carl Woese, 1977"], correct: 1, why: "R. H. Whittaker proposed the Five Kingdom Classification in 1969, based on cell structure, body organisation, nutrition, reproduction, and phylogeny." },
                { q: "Which of the following is NOT a criterion used in the Five Kingdom system?", opts: ["Cell structure", "Body organisation", "Habitat / geographic distribution", "Mode of nutrition"], correct: 2, why: "Whittaker's five criteria are cell structure, body organisation, mode of nutrition, reproduction, and phylogenetic relationships — not geography." },
                { q: "Archaebacteria differ from eubacteria mainly in their:", opts: ["Cell wall chemistry", "Presence of a nucleus", "Mode of nutrition only", "Number of chromosomes"], correct: 0, why: "Archaebacteria have a distinct cell wall chemistry that allows them to survive in extreme habitats like hot springs and salty areas." },
                { q: "Heterocysts, the sites of nitrogen fixation, are found in:", opts: ["Diatoms", "Cyanobacteria", "Euglenoids", "Slime moulds"], correct: 1, why: "Cyanobacteria such as Nostoc and Anabaena possess specialised cells called heterocysts where nitrogen fixation occurs." },
                { q: "The cell wall of diatoms is embedded with silica and leaves behind indestructible deposits called:", opts: ["Diatomaceous earth", "Pellicle", "Plasmodium", "Capsid"], correct: 0, why: "Diatom cell walls form two overlapping, indestructible shells; their accumulated remains form 'diatomaceous earth'." },
                { q: "Which protozoan group includes the malarial parasite Plasmodium?", opts: ["Amoeboid protozoans", "Flagellated protozoans", "Ciliated protozoans", "Sporozoans"], correct: 3, why: "Plasmodium belongs to the sporozoans — a group of protozoans with an infectious spore-like stage and no locomotory organs." },
                { q: "The cell wall of fungi is made up of:", opts: ["Cellulose", "Chitin", "Peptidoglycan", "Pectin"], correct: 1, why: "Unlike plants (cellulose), the fungal cell wall is composed of chitin." },
                { q: "Which class of fungi reproduces only by asexual spores called conidia, with no known sexual stage?", opts: ["Phycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes"], correct: 3, why: "Deuteromycetes, or 'imperfect fungi', reproduce only asexually via conidia; they're reclassified once a sexual stage is discovered." },
                { q: "A lichen is a symbiotic association between:", opts: ["Fungus and bacteria", "Alga and fungus", "Virus and bacterium", "Fungus and plant root"], correct: 1, why: "A lichen is a symbiotic partnership between an alga (phycobiont, prepares food) and a fungus (mycobiont, provides shelter)." },
                { q: "Viroids differ from viruses mainly because viroids:", opts: ["Contain DNA only, never RNA", "Have a protein coat but no nucleic acid", "Consist of free RNA with no protein coat", "Are larger than viruses"], correct: 2, why: "Discovered by T. O. Diener, viroids consist of low molecular weight free RNA with no protein coat at all, unlike viruses." },
            ],
            'cell-unit-of-life': [
                { q: "Who proposed that 'all cells arise from pre-existing cells'?", opts: ["Robert Hooke", "Schleiden", "Schwann", "Rudolf Virchow"], correct: 3, why: "Rudolf Virchow (1855) expanded the cell theory with the principle 'Omnis cellula e cellula' — all cells arise from pre-existing cells." },
                { q: "A defining structural difference between prokaryotic and eukaryotic cells is:", opts: ["Presence of a plasma membrane", "Presence of a membrane-bound nucleus", "Presence of cytoplasm", "Presence of ribosomes"], correct: 1, why: "Eukaryotic cells have a true, membrane-bound nucleus; prokaryotic cells have only a nucleoid, an unbound region of DNA." },
                { q: "The fluid mosaic model of the plasma membrane was proposed by:", opts: ["Robert Brown", "Singer and Nicolson", "Camillo Golgi", "Schleiden and Schwann"], correct: 1, why: "Singer and Nicolson (1972) proposed the fluid mosaic model, describing membrane lipids as a fluid bilayer studded with proteins." },
                { q: "Which organelle is NOT considered part of the endomembrane system?", opts: ["Endoplasmic reticulum", "Golgi apparatus", "Mitochondria", "Lysosomes"], correct: 2, why: "Mitochondria (like chloroplasts and peroxisomes) are excluded from the endomembrane system because their functions aren't coordinated with the ER-Golgi-lysosome-vacuole network." },
                { q: "Lysosomes are often called the 'suicide bags' of the cell because they:", opts: ["Store excess water", "Contain hydrolytic enzymes that can digest the cell itself", "Produce ATP for the cell", "Synthesise proteins"], correct: 1, why: "Lysosomes contain powerful hydrolytic enzymes active in acidic conditions, which can break down the cell's own components under abnormal conditions." },
                { q: "Mitochondria are called the 'power houses' of the cell because they:", opts: ["Store starch", "Synthesise ATP through cellular respiration", "Produce hydrolytic enzymes", "Package proteins for secretion"], correct: 1, why: "Mitochondria generate ATP, the cell's energy currency, through aerobic respiration — hence their nickname." },
                { q: "Which type of plastid is responsible for photosynthesis?", opts: ["Chromoplast", "Leucoplast", "Chloroplast", "Amyloplast"], correct: 2, why: "Chloroplasts contain chlorophyll a and b and carotenoids, and are the site of photosynthesis." },
                { q: "The characteristic '9 + 2' arrangement of microtubules is found in:", opts: ["Centrioles", "Ribosomes", "Cilia and flagella", "Golgi cisternae"], correct: 2, why: "Cilia and flagella show nine peripheral microtubule doublets surrounding two central singlets — the '9+2' arrangement." },
                { q: "The site of ribosomal RNA (rRNA) synthesis within the nucleus is the:", opts: ["Nuclear envelope", "Nucleolus", "Chromatin", "Nuclear pore"], correct: 1, why: "The nucleolus is a dense, non-membrane-bound structure inside the nucleus, and is the site of rRNA synthesis and ribosome assembly." },
                { q: "A chromosome in which the centromere lies very close to one end, giving one very short and one very long arm, is called:", opts: ["Metacentric", "Sub-metacentric", "Acrocentric", "Telocentric"], correct: 2, why: "Acrocentric chromosomes have the centromere near one end, producing one very short arm and one very long arm; telocentric chromosomes have the centromere exactly at the tip." },
            ],
        };

        let quizData = quizBank['living-world'];
        let userAnswers = new Array(quizData.length).fill(null);
        let quizSubmitted = false;

        function renderQuiz() {
            quizData = quizBank[currentChapterId] || quizBank['living-world'];
            quizSubmitted = false;
            userAnswers = new Array(quizData.length).fill(null);
            document.getElementById('quiz-summary-box').hidden = true;
            document.getElementById('submit-quiz-btn').hidden = false;
            const container = document.getElementById('quiz-questions');
            container.innerHTML = quizData.map((item, qi) => {
                const opts = item.opts.map((opt, oi) => `
      <label class="opt" id="opt-${qi}-${oi}">
        <input type="radio" name="q${qi}" value="${oi}" onchange="selectAnswer(${qi},${oi})">
        ${opt}
      </label>`).join('');
                return `<div class="q-card">
      <div class="q-progress">Question ${qi + 1} of ${quizData.length}</div>
      <div class="q-text">${item.q}</div>
      ${opts}
      <div class="q-explain" id="explain-${qi}">${item.why}</div>
    </div>`;
            }).join('');
        }
        function selectAnswer(qi, oi) {
            if (quizSubmitted) return;
            userAnswers[qi] = oi;
        }
        function submitQuiz() {
            if (quizSubmitted) return;
            quizSubmitted = true;
            let score = 0;
            quizData.forEach((item, qi) => {
                const chosen = userAnswers[qi];
                if (chosen === item.correct) score++;
                for (let oi = 0; oi < item.opts.length; oi++) {
                    const el = document.getElementById(`opt-${qi}-${oi}`);
                    const input = el.querySelector('input');
                    input.disabled = true;
                    if (oi === item.correct) { el.classList.add('correct'); }
                    else if (oi === chosen) { el.classList.add('incorrect'); }
                }
                document.getElementById(`explain-${qi}`).style.display = 'block';
            });
            document.getElementById('submit-quiz-btn').hidden = true;
            document.getElementById('quiz-summary-box').hidden = false;
            document.getElementById('quiz-score-text').textContent = `${score} / ${quizData.length}`;
            let msg;
            if (score === quizData.length) msg = "Perfect score — the chapter has stuck.";
            else if (score >= quizData.length * 0.7) msg = "Solid grasp — revisit the ones you missed.";
            else if (score >= quizData.length * 0.4) msg = "Getting there — worth a re-read of the notes.";
            else msg = "Head back to the notes and try again.";
            document.getElementById('quiz-score-msg').textContent = msg;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            saveQuizScore(score);
        }
        function retakeQuiz() { renderQuiz(); window.scrollTo({ top: 0, behavior: 'instant' }); }

        /* ---------------------------------------------------------
           PERSISTENT STORAGE: daily streak + quiz scores
        --------------------------------------------------------- */
        function todayStr() {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        }
        async function loadLog() {
            try {
                const value = localStorage.getItem('study-log');
                return value ? JSON.parse(value) : [];
            } catch (e) { return []; }
        }
        async function saveLog(arr) {
            try { localStorage.setItem('study-log', JSON.stringify(arr)); }
            catch (e) { console.error('storage save failed', e); }
        }
        async function saveQuizScore(score) {
            try {
                localStorage.setItem('quiz-' + currentChapterId, JSON.stringify({ last: score, total: quizData.length, date: todayStr() }));
            } catch (e) { console.error(e); }
        }
        function computeStreak(dates) {
            if (!dates.length) return 0;
            const set = new Set(dates);
            let streak = 0;
            let cursor = new Date();
            // if today isn't logged, start counting from yesterday (streak still "alive")
            if (!set.has(todayStr())) {
                cursor.setDate(cursor.getDate() - 1);
            }
            while (true) {
                const ds = cursor.getFullYear() + '-' + String(cursor.getMonth() + 1).padStart(2, '0') + '-' + String(cursor.getDate()).padStart(2, '0');
                if (set.has(ds)) { streak++; cursor.setDate(cursor.getDate() - 1); }
                else break;
            }
            return streak;
        }
        async function refreshTracker() {
            const log = await loadLog();
            const streak = computeStreak(log);
            document.getElementById('flame-num').textContent = streak;
            document.getElementById('nav-streak').textContent = `🔥 ${streak} day streak`;
            const doneToday = log.includes(todayStr());
            const btn = document.getElementById('mark-today-btn');
            if (doneToday) {
                btn.textContent = "Today's study logged ✓";
                btn.disabled = true;
                document.getElementById('tracker-sub').textContent = "Nice work — come back tomorrow to keep the streak alive.";
            } else {
                btn.textContent = "Mark today done";
                btn.disabled = false;
                document.getElementById('tracker-sub').textContent = "Mark today complete once you've finished reading a chapter.";
            }
        }
        async function markToday() {
            const log = await loadLog();
            const t = todayStr();
            if (!log.includes(t)) {
                log.push(t);
                await saveLog(log);
            }
            refreshTracker();
        }

        /* init */
        refreshTracker();
        go('intro');
