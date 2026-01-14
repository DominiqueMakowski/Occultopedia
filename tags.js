// Tags associated with various occult traditions, practices, and beliefs. Must be specific yet general enough to apply across multiple entries.
// The `inspiredBy` field lists other traditions that influenced this one.

const dataTags = {
    Cult_of_Ishtar_Inanna: {
        tags: [
            "location_middle_east", // Sumer, Akkad, Babylon
            "era_ancient", // 4000 BCE – 400 CE
            "belief_polytheism",
            "belief_sacred_feminine", // Primacy of the Goddess
            "belief_dualism", // Goddess of paradox/opposites (Merged liminality)
            "belief_gnosis", // Power requires ego-death
            "practice_transgression", // Breaking social taboos
            "practice_sex_magic", // Hieros Gamos/Sacred Prostitution
            "practice_sex", // Actual sexual acts involved
            "practice_cross_dressing", // Gender ambiguity in priesthood
            "practice_katabasis", // Ritual descent/Underworld journey
            "practice_altered_state", // Trance/Wailing/Ecstasy
            "practice_ritual_drama", // Ritual weeping (Merged lamentation)
            "practice_chant",
            "practice_prayer",
            "practice_carnal_aesthetic",
            "practice_ecstatic_aesthetic",
            "practice_taboobreaking",
            "belief_pagan",
        ],
        startDate: -4000,
        endDate: 400,
        inspiredBy: [],
    },

    The_Magi: {
        tags: [
            "location_middle_east", // Persia/Iran
            "era_ancient", // 6th Century BCE
            "belief_dualism", // Truth (Asha) vs Lie (Druj)
            "belief_purity", // Sanctity of elements (Fire/Water)
            "belief_messianism", // The Saoshyant (Savior)
            "practice_secrecy", // The Baj (Ritual Silence)
            "practice_purity_ritual", // Preventing breath pollution
            "practice_entheogen", // Haoma/Ephedra consumption
            "practice_altered_state", // Inducing trance via Haoma
            "practice_divination", // Astrology/Reading the heavens
            "practice_funerary", // Sky burial/Tower of Silence
            "practice_mantra", // Manthra recitation
            "practice_chant",
            "practice_prayer",
            "practice_macabre_aesthetic", // Sky burial
            "practice_intellectual_aesthetic", // Astrology/Astronomy roots
        ],
        startDate: -600,
        endDate: 700,
        inspiredBy: [],
    },

    Order_of_the_Magi_Richmond: {
        tags: [
            "location_north_america", // Chicago, USA
            "era_industrial", // 1889
            "belief_occult_history", // Atlantis/Lost Civilizations
            "belief_determinism", // Life ruled by birth card
            "belief_numerology", // Mathematical cosmology
            "practice_divination", // Cartomancy/Grand Spread
            "practice_ceremonial_magic", // Solar value calculation
            "practice_initiation", // Temple degrees
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1889,
        endDate: null,
        inspiredBy: ["The_Magi"],
    },

    Confraternity_of_the_Three_Kings: {
        tags: [
            "location_europe", // Cologne, Germany
            "era_medieval", // 12th Century
            "belief_sovereignty", // Royal Sacrality (Merged divine_right)
            "belief_thaumaturgy", // Relics cure epilepsy
            "practice_pilgrimage", // Travel to the shrine
            "practice_theatricality", // Star singing processions
            "practice_talismans", // Dreikonigszettel amulets
            "practice_feasting", // Epiphany celebrations
            "practice_chant", // Star singing
            "practice_prayer",
            "belief_christianity",
        ],
        startDate: 1100,
        endDate: null,
        inspiredBy: [],
    },

    Modern_Zoroastrian_Priesthood: {
        tags: [
            "location_asia", // India (Mumbai) and Iran
            "era_modern", // Contemporary
            "belief_purity", // Fire as manifestation of Asha
            "belief_bloodline", // Hereditary priesthood (Merged bloodline_exclusivity)
            "belief_dualism", // Cosmic battle of good/evil
            "practice_purity_ritual", // Strict hygiene/Nirangdin
            "practice_fire_worship", // Atash Behram tending
            "practice_initiation", // Navjote ceremony
            "practice_mantra", // Yasna recitation
            "practice_chant",
            "practice_prayer",
        ],
        startDate: 1900,
        endDate: null,
        inspiredBy: ["The_Magi"],
    },

    Cult_of_Cybele_Magna_Mater: {
        tags: [
            "location_europe", // Rome (via Anatolia)
            "era_ancient", // 204 BC
            "belief_animism", // Nature Worship/Mountain Mother
            "belief_sacred_feminine", // Mother of Gods
            "practice_altered_state", // Frenzied dance/Corybantic drumming
            "practice_transgression", // Gender-non-conforming priests (Galli)
            "practice_body_modification", // Castration
            "practice_self_mutilation", // Self-castration/Flagellation
            "practice_violence", // Ritual bloodletting
            "practice_blood_rite", // Taurobolium (Bull blood baptism)
            "practice_procession", // Carrying the Black Rock
            "practice_dance",
            "practice_chant",
            "practice_macabre_aesthetic",
            "practice_ecstatic_aesthetic",
            "practice_taboobreaking",
            "belief_pagan",
        ],
        startDate: -204,
        endDate: 400,
        inspiredBy: ["Cult_of_Ishtar_Inanna"],
    },

    Eleusinian_Mysteries: {
        tags: [
            "location_europe", // Greece
            "era_ancient", // c. 1600 BCE - 392 CE
            "belief_gnosis", // Experiential salvation
            "belief_regeneration", // Cycle of grain/Rebirth
            "belief_afterlife", // Better lot in Hades
            "practice_initiation", // Telesterion/Darkness to Light
            "practice_entheogen", // Kykeon (barley/ergot drink)
            "practice_altered_state", // Ergot intoxication
            "practice_secrecy", // The 'arrheta' (unspeakable)
            "practice_transgression", // Bridge Jests/Humiliation
            "practice_fasting", // Prerequisite for the rite
            "practice_procession", // Torchlight walk
            "practice_chant",
            "practice_prayer",
            "practice_ecstatic_aesthetic",
            "belief_pagan",
        ],
        startDate: -1600,
        endDate: 392,
        inspiredBy: [],
    },

    Pythagoreanism: {
        tags: [
            "location_europe", // Croton, Italy
            "era_ancient", // c. 570 BCE
            "belief_numerology", // All is Number/Sacred Geometry
            "belief_reincarnation", // Metempsychosis
            "belief_cosmology", // Music of the Spheres (Merged cosmic_harmony)
            "practice_dietary_restriction", // Vegetarianism/Bean taboo
            "practice_secrecy", // Vow of silence
            "practice_meditation", // Reviewing day in reverse (Merged mental_discipline)
            "practice_fictive_kinship", // Philosophical brotherhood
            "practice_intellectual_aesthetic",
            "practice_poverty", // Often communal living
            "belief_pagan",
        ],
        startDate: -570,
        endDate: -300,
        inspiredBy: [],
    },

    Mithraic_Mysteries: {
        tags: [
            "location_europe", // Roman Empire
            "era_ancient", // 1st-4th Century CE
            "belief_ascent", // Soul travel through spheres
            "belief_determinism", // Astrology/Precession
            "practice_initiation", // 7 Grades/Ladder
            "practice_hierarchy", // Military-style grades
            "practice_fictive_kinship", // Handshakes/Syndexioi
            "practice_katabasis", // Cave ritual (Mithraeum)
            "practice_ritual_meal", // Bread and water/wine
            "practice_martial_aesthetics",
            "practice_macabre_aesthetic", // Imagery of bull slaying
            "belief_pagan",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 400,
        inspiredBy: ["The_Magi"],
    },

    Sethian_Gnostics: {
        tags: [
            "location_middle_east", // Eastern Mediterranean
            "era_ancient", // 1st-2nd Century CE
            "belief_gnosis", // Salvation via Knowledge (Merged divine_spark)
            "belief_prison_planet", // Creator (Demiurge) is a demon/ignorant
            "belief_dualism", // Spirit vs Matter
            "practice_meditation", // Vowel chanting/Stillness
            "practice_purity_ritual", // Baptism/Five Seals
            "practice_asceticism", // Rejection of the body
            "practice_chant", // Vowel chanting
            "practice_chastity",
            "practice_intellectual_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: [],
    },

    Valentinian_Christians: {
        tags: [
            "location_europe", // Rome/Mediterranean
            "era_ancient", // c. 140 CE
            "belief_dualism", // Syzygy/Gender polarity
            "belief_elitism", // Pneumatics (saved) vs Psychics vs Hylics
            "practice_sex_magic", // Bridal Chamber (spiritual/ritual)
            "practice_sex", // Polarity ritual (symbolic or actual)
            "practice_mantra", // Healing vowels
            "practice_theatricality", // Wine tricks/Ritual drama
            "practice_ritual_meal", // Gnostic Eucharist
            "practice_initiation", // Redemption rite
            "practice_chant",
            "practice_prayer",
            "practice_intellectual_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 140,
        endDate: 400,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Ophian_Gnostics: {
        tags: [
            "location_middle_east", // Mediterranean
            "era_ancient", // 2nd Century
            "belief_prison_planet", // Rejection of cosmos
            "belief_antinomianism", // Veneration of Serpent (freedom bringer) (Merged inversion)
            "practice_transgression", // Inversion of Jewish Law
            "practice_ceremonial_magic", // Ritual mapping/Diagram of Archons
            "practice_theatricality", // Animal masks
            "practice_ritual_meal", // Serpent Eucharist
            "practice_taboobreaking",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Naassenes: {
        tags: [
            "location_middle_east", // Rome/Levant
            "era_ancient", // 2nd Century
            "belief_androgyny", // Primal Man is male/female
            "belief_gnosis", // Internal Temple/Brain as sanctuary
            "practice_animal_worship", // Serpent veneration
            "practice_transgression", // Breaking sexual taboos
            "practice_sex_magic", // Retention of seed/Spermo-gnosticism
            "practice_sex", // Ritual control of sexuality
            "practice_mantra", // Hymns to Attis
            "practice_chant",
            "practice_taboobreaking",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Peratics: {
        tags: [
            "location_middle_east", // Mediterranean
            "era_ancient", // 2nd Century
            "belief_determinism", // Astrology/Zodiac stars as enemies
            "belief_gnosis", // Christ as Draco/Serpent
            "practice_body_modification", // Mark of Cain/Tattoo
            "practice_katabasis", // Hell Walk (psychological)
            "practice_astral_magic", // Navigating fixed stars
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Hermetic_Circles: {
        tags: [
            "location_middle_east", // Egypt
            "era_ancient", // 1st-3rd Century
            "belief_apotheosis", // Humans are mortal gods
            "belief_macrocosm_microcosm", // As above, so below
            "practice_theurgy", // Singing the world into being
            "practice_dietary_restriction", // Vegetarianism
            "practice_divination", // Decans/Zodiac
            "practice_meditation", // Directional prayer
            "practice_chant",
            "practice_prayer",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
            "belief_pagan",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: [],
    },

    Simonians: {
        tags: [
            "location_middle_east", // Samaria
            "era_ancient", // 1st Century
            "belief_incarnation", // Simon as God Incarnate (Merged divine_avatar)
            "belief_gnosis", // Redemption through Helena (Fallen Thought)
            "practice_sex_magic", // 'Perfect Love' ritual
            "practice_sex", // Ritualized intercourse
            "practice_veneration", // Veneration of statues (Merged idolatry)
            "practice_personality_cult", // Simon Magus
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 0,
        endDate: 100,
        inspiredBy: [],
    },

    Manichaeism: {
        tags: [
            "location_middle_east", // Babylon/Global
            "era_ancient", // 3rd Century
            "belief_dualism", // Light vs Darkness (Absolute)
            "belief_syncretism", // Jesus/Buddha/Zoroaster combined
            "practice_dietary_restriction", // Digestive purification
            "practice_asceticism", // Celibacy/Vegetarianism for Elect
            "practice_hierarchy", // Elect vs Hearers
            "practice_feasting", // The Bema festival
            "practice_chastity",
            "practice_poverty",
            "practice_fasting",
            "practice_chant",
            "practice_prayer",
        ],
        startDate: 200,
        endDate: 1400,
        inspiredBy: ["Sethian_Gnostics", "The_Magi"],
    },

    Mandaeans: {
        tags: [
            "location_middle_east", // Iraq/Iran
            "era_ancient", // 1st Century - Present
            "belief_dualism", // Light vs Darkness
            "belief_gnosis", // Knowledge of Life (Manda)
            "practice_purity_ritual", // Masbuta (Living Water Baptism)
            "practice_funerary", // Masiqta (Mass for dead)/Descent
            "practice_ritual_clothing", // Ritual robes (Rasta)
            "practice_mantra", // Prayer/Qolasta
            "practice_chant",
            "practice_prayer",
            "practice_ecstatic_aesthetic", // Baptism involves immersion and chant
        ],
        startDate: 100,
        endDate: null,
        inspiredBy: [],
    },

    Jeuians: {
        tags: [
            "location_middle_east", // Egypt
            "era_ancient", // 3rd Century
            "belief_gnosis", // Treasuries of Light
            "practice_ceremonial_magic", // Seals/Ciphers/Ritual mapping
            "practice_altered_state", // Circle dance/Ecstasy
            "practice_theurgy", // Invocation of Treasuries
            "practice_dance",
            "practice_chant",
            "practice_ecstatic_aesthetic",
            "belief_christianity", // Gnostic Christian
        ],
        startDate: 200,
        endDate: 400,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Freemasonry: {
        tags: [
            "location_europe", // London (Origin)
            "era_preindustrial", // 1717 (Formal)
            "belief_numerology", // Sacred Geometry/Great Architect
            "belief_moral_allegory", // Tools as moral lessons
            "belief_universalism", // Brotherhood of man
            "practice_initiation", // 3 Degrees/Resurrection enactment
            "practice_secrecy", // Passwords/Penalties
            "practice_ritual_death", // Ritual grave/Hiramic Myth
            "practice_ritual_drama", // Reenactment of myths
            "practice_fictive_kinship", // Universal Fraternity
            "practice_feasting", // Festive Board
            "practice_macabre_aesthetic", // Skull/coffin in ritual
            "belief_humanism",
            "belief_syncretism",
        ],
        startDate: 1717,
        endDate: null,
        inspiredBy: ["Knights_Templar_Historical"],
    },

    Masonic_Knights_Templar: {
        tags: [
            "location_global", // Europe/US
            "era_preindustrial", // Mid-18th Century
            "belief_christian_defense", // Trinitarian/Defense of Faith
            "practice_memento_mori", // Mortality contemplation (Merged belief_memento_mori)
            "practice_knightly_aesthetic", // Swords/Chapeaux/Drill
            "practice_ritual_drinking", // Fifth Libation
            "practice_initiation", // Mediterranean Pass
            "practice_feasting", // Ritual toasts
            "practice_martial_aesthetics",
            "practice_macabre_aesthetic",
            "belief_christianity",
        ],
        startDate: 1750,
        endDate: null,
        inspiredBy: ["Freemasonry", "Knights_Templar_Historical"],
    },

    The_Illuminati: {
        tags: [
            "location_europe", // Bavaria
            "era_preindustrial", // 1776
            "belief_humanism", // Reason over Religion (Merged rationalism)
            "belief_political_subversion", // Infiltration/New Order
            "practice_surveillance", // Quibus Licet (Reporting on members)
            "practice_initiation", // Minerval system (Merged mentorship)
            "practice_cryptography", // Ciphers/Secrecy
            "practice_intellectual_aesthetic",
            "belief_humanism",
        ],
        startDate: 1776,
        endDate: 1785,
        inspiredBy: ["Freemasonry"],
    },

    Rosicrucianism_AMORC: {
        tags: [
            "location_north_america", // New York/California
            "era_industrial", // 1915
            "belief_cosmology", // Metaphysics/Cosmic Consciousness (Merged universal_laws)
            "belief_occult_history", // Egyptian lineage
            "practice_visualization", // Mirror Sanctum
            "practice_mantra", // Vowel intonation
            "practice_meditation", // Sanctum rituals
            "practice_chant",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1915,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Hermetic_Order_of_the_Golden_Dawn: {
        tags: [
            "location_europe", // London
            "era_industrial", // 1888
            "belief_ascent", // Redemptive Ascent of Tree of Life
            "belief_ascended_masters", // Contact with invisible masters (Merged secret_chiefs)
            "belief_syncretism", // Kabbalah/Egypt/Hermeticism
            "practice_ceremonial_magic", // Banishing/Godforms
            "practice_ritual_death", // Vault of the Adepts
            "practice_visualization", // Tattwas/Astral vision
            "practice_divination", // Tarot/Astrology
            "practice_mantra", // Vibration of God names
            "practice_chant",
            "practice_macabre_aesthetic", // Vault ritual
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1888,
        endDate: 1903,
        inspiredBy: ["Hermetic_Circles", "Rosicrucianism", "Freemasonry", "Eliphas_Levi_Circle"],
    },

    Temple_of_the_Black_Light: {
        tags: [
            "location_europe", // Sweden
            "era_modern", // 1995
            "belief_prison_planet", // Cosmos is a trap
            "belief_gnosis", // Return to primal chaos (Merged chaos_gnosticism)
            "belief_apocalypse", // Day of Wrath
            "practice_katabasis", // Opening Dark Gates
            "practice_transgression", // Invoking destructive forces
            "practice_mantra", // Acausal/Sinister vibration
            "practice_ceremonial_magic", // Qliphoth/Shadow Tree
            "practice_chant",
            "practice_macabre_aesthetic",
            "practice_taboobreaking",
            "belief_syncretism",
        ],
        startDate: 1995,
        endDate: null,
        inspiredBy: ["Dragon_Rouge"],
    },

    Scottish_Rite_AASR: {
        tags: [
            "location_north_america", // Charleston, USA
            "era_industrial", // 1801
            "belief_enlightenment", // Human perfectibility/Liberty
            "belief_syncretism", // Kabbalah/Hermeticism/Christianity
            "practice_initiation", // 33 Degrees
            "practice_theatricality", // Elaborate costume degrees
            "practice_ritual_drama", // Plays
            "practice_feasting", // Maundy Thursday feast
            "practice_intellectual_aesthetic",
            "belief_humanism",
        ],
        startDate: 1801,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Royal_Arch_Masonry: {
        tags: [
            "location_europe", // UK/Ireland
            "era_industrial", // 18th Century
            "belief_gnosis", // Recovery of Lost Word
            "practice_initiation", // Passing the Veils
            "practice_katabasis", // Discovery of Vault
            "practice_secrecy", // The Living Arch/Omerta
            "practice_mantra", // Omnific Word
            "practice_chant",
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1750,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Shriners_AAONMS: {
        tags: [
            "location_north_america", // New York
            "era_industrial", // 1870s
            "belief_fictive_kinship", // Fun and fellowship
            "practice_theatricality", // Theatrical Middle Eastern aesthetic (Merged orientalism)
            "practice_procession", // Parades/Mini-cars
            "practice_hazing", // "Hot Sands" ordeal
            "practice_feasting", // Potentate's Ball
            "practice_ecstatic_aesthetic", // In the sense of revelry
        ],
        startDate: 1870,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Ancient_Order_of_Foresters: {
        tags: [
            "location_europe", // UK
            "era_industrial", // 18th Century
            "belief_animism", // Nature/Greenwood symbolism
            "belief_brotherhood", // Insurance/Fraternity (Merged mutual_aid)
            "practice_knightly_aesthetic", // Beadles with swords
            "practice_ritual_drama", // Court meetings
            "practice_feasting", // Court dinners
            "practice_martial_aesthetics",
        ],
        startDate: 1790,
        endDate: null,
        inspiredBy: [],
    },

    Order_of_the_Eastern_Star: {
        tags: [
            "location_north_america", // USA
            "era_industrial", // 1850
            "belief_numerology", // Sacred Geometry/Pentagram
            "belief_moral_allegory", // Heroines of Bible
            "practice_ritual_drama", // Star Point lectures/Labyrinth walk
            "practice_symbolism", // Astronomy/Star symbolism
            "belief_christianity",
        ],
        startDate: 1850,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Church_of_Satan: {
        tags: [
            "location_north_america", // San Francisco
            "era_modern", // 1966
            "belief_atheism", // Carnal Ego/Atheism (Merged materialism)
            "belief_elitism", // Stratification
            "practice_ritual_drama", // Ritual as emotional release (Merged psychodrama)
            "practice_transgression", // Black Mass/Blasphemy
            "practice_sex_magic", // Erotic Crystallization (symbolic)
            "practice_sex", // Use of sexuality in ritual (altar)
            "practice_personality_cult", // Anton LaVey
            "practice_theatricality", // Capes/Horns/Nudity
            "practice_macabre_aesthetic",
            "practice_carnal_aesthetic",
            "practice_taboobreaking",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1966,
        endDate: null,
        inspiredBy: [],
    },

    Temple_of_Set: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1975
            "belief_apotheosis", // Xeper (Self-deification) (Merged isolate_intelligence)
            "practice_ceremonial_magic", // Subjective Universe manipulation
            "practice_initiation", // Order of the Trapezoid
            "practice_personality_cult", // Michael Aquino
            "practice_intellectual_aesthetic",
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1975,
        endDate: null,
        inspiredBy: ["Church_of_Satan"],
    },

    Order_of_Somerton_Eyes_Wide_Shut: {
        tags: [
            "location_fictional", // New York (Film)
            "era_fictional", // 1999
            "belief_transgression", // Pain as currency/Sacrificial protection
            "belief_hedonism", // Anonymous desire
            "practice_sex_magic", // Orgiastic ritual
            "practice_sex", // Group sex
            "practice_anonymity", // Masks/Robes
            "practice_secrecy", // Passwords/Fidelio
            "practice_mantra", // Romanian orthodox chant (inverted)
            "practice_chant",
            "practice_carnal_aesthetic",
            "practice_macabre_aesthetic",
        ],
        startDate: 1999,
        endDate: 1999,
        inspiredBy: [],
    },

    Rothschild_Surrealist_Ball_1972: {
        tags: [
            "location_europe", // France
            "era_modern", // 1972
            "belief_surrealism", // Inversion of reality
            "practice_theatricality", // Costume/Surrealist heads
            "practice_transgression", // Cannibalistic aesthetics (dolled food)
            "practice_feasting", // Surrealist dinner
            "practice_katabasis", // Labyrinth entry
            "practice_macabre_aesthetic",
        ],
        startDate: 1972,
        endDate: 1972,
        inspiredBy: [],
    },

    Dragon_Rouge: {
        tags: [
            "location_europe", // Sweden
            "era_modern", // 1989
            "belief_dark_side", // Shadow integration
            "belief_apotheosis", // Self-deification
            "practice_ceremonial_magic", // Draconian/Kundalini
            "practice_katabasis", // Tunnel exploration
            "practice_mantra", // Mantra work
            "practice_initiation", // Qliphothic degrees
            "practice_chant",
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1989,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Ordo_Templi_Orientis_OTO: {
        tags: [
            "location_europe", // Germany/UK
            "era_modern", // 1900s
            "belief_thelema", // Do what thou wilt
            "belief_gnosis", // Solar Phallicism
            "practice_sex_magic", // Spermo-Gnosticism (VIII, IX degrees)
            "practice_sex", // Ritual intercourse
            "practice_ritual_drama", // Gnostic Mass
            "practice_feasting", // Feast for Life/Fire/Water
            "practice_solar_worship", // Resh adoration
            "practice_chant",
            "practice_carnal_aesthetic",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1904,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Wicca: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1950s
            "belief_dualism", // God and Goddess
            "belief_animism", // Nature Worship/Wheel of the Year
            "practice_mediumship", // Drawing Down the Moon
            "practice_sex_magic", // Great Rite (Symbolic or Actual)
            "practice_sex", // Potential for actual Great Rite
            "practice_feasting", // Cakes and Ale
            "practice_altered_state", // Spiral dance
            "practice_initiation", // Coven degrees
            "practice_dance",
            "practice_chant",
            "practice_prayer",
            "belief_pagan",
        ],
        startDate: 1954,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn", "Freemasonry", "Theosophical_Society"],
    },

    Ancient_Order_of_Druids: {
        tags: [
            "location_europe", // UK
            "era_preindustrial", // 1781
            "belief_animism", // Nature Worship/Trees/Solstices
            "belief_ancestral_wisdom", // Bardic tradition revival
            "practice_mantra", // Chanting/Eisteddfod
            "practice_ritual_drama", // Stonehenge rites
            "practice_astronomy", // Solstice alignment
            "practice_chant",
            "practice_prayer",
            "belief_pagan",
        ],
        startDate: 1781,
        endDate: null,
        inspiredBy: [],
    },

    Knights_Templar_Historical: {
        tags: [
            "location_middle_east", // Jerusalem
            "era_medieval", // 1119
            "belief_martyrdom", // Salvation through death in battle
            "belief_fictive_kinship", // Monastic warrior code
            "practice_knightly_aesthetic",
            "practice_violence", // Warfare/Crusading
            "practice_asceticism", // Poverty/Chastity
            "practice_communal_living", // Silent meals
            "practice_secrecy", // Chapter secrecy
            "practice_initiation", // The Reception
            "practice_chastity",
            "practice_poverty",
            "practice_fasting",
            "practice_prayer",
            "practice_chant",
            "practice_martial_aesthetics",
            "belief_christianity",
        ],
        startDate: 1119,
        endDate: 1312,
        inspiredBy: [],
    },

    Knights_of_Malta_SMOM: {
        tags: [
            "location_middle_east", // Jerusalem/Malta/Rome
            "era_medieval", // 1048
            "belief_sovereignty", // Subject of international law
            "practice_charity", // Service to sick (Hospitallers)
            "practice_knightly_aesthetic", // Diplomatic passports/Robes
            "practice_mantra", // Liturgy/Daily Office
            "practice_feasting", // St John's Day
            "practice_prayer",
            "practice_chant",
            "practice_martial_aesthetics",
            "belief_christianity",
        ],
        startDate: 1048,
        endDate: null,
        inspiredBy: [],
    },

    Teutonic_Knights: {
        tags: [
            "location_europe", // Acre/Baltic
            "era_medieval", // 1190
            "belief_expansionism", // Drang nach Osten/Conversion
            "practice_violence", // Crusading
            "practice_hierarchy", // Electoral college for Grand Master
            "practice_communal_living", // Commensality
            "practice_martial_aesthetics",
            "practice_chastity",
            "practice_poverty",
            "practice_prayer",
            "practice_chant",
            "belief_christianity",
        ],
        startDate: 1190,
        endDate: null,
        inspiredBy: ["Knights_Templar_Historical"],
    },

    Scientology: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1950s
            "belief_prison_planet", // MEST is a trap/Thetans
            "belief_science_fiction", // Space Opera/Xenu
            "belief_gnosis", // Going Clear/Total Freedom
            "practice_purity_ritual", // Purification Rundown/Sauna
            "practice_surveillance", // Sec Checks/Knowledge Reports
            "practice_hazing", // Bullbaiting/RPF (Rehabilitation Project Force)
            "practice_abuse", // Psychological abuse
            "practice_initiation", // The Bridge
            "practice_personality_cult", // L. Ron Hubbard
            "practice_scifi_aesthetics",
            "practice_corporate_aesthetic",
        ],
        startDate: 1954,
        endDate: null,
        inspiredBy: [],
    },

    Order_of_the_Solar_Temple: {
        tags: [
            "location_europe", // Switzerland/Canada
            "era_modern", // 1984
            "belief_apocalypse", // Environmental doom
            "belief_science_fiction", // Transit to Sirius
            "practice_ritual_suicide", // Mass transit by fire
            "practice_suicide", // Actual death
            "practice_violence", // Murder/Suicide
            "practice_theatricality", // Holograms/Spiritual manifestations (Merged illusion)
            "practice_astronomy", // Sirius alignment
            "practice_personality_cult", // Luc Jouret
            "practice_scifi_aesthetics",
            "practice_macabre_aesthetic",
            "practice_martial_aesthetics", // Members often wore capes/swords in ritual
            "belief_syncretism",
        ],
        startDate: 1984,
        endDate: 1997,
        inspiredBy: ["Renewed_Order_of_the_Temple_ORT"],
    },

    Renewed_Order_of_the_Temple_ORT: {
        tags: [
            "location_europe", // France
            "era_modern", // 1970
            "belief_occult_history", // Solar Tradition (Merged solar_tradition)
            "belief_white_supremacy", // Racism/Neo-Nazi undertones
            "belief_aryan_race", // Esoteric Neo-Nazism
            "practice_knightly_aesthetic", // Capes/Investitures
            "practice_solar_worship", // Solar Mass
            "practice_martial_aesthetics",
            "belief_racism",
            "belief_syncretism",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: ["Knights_Templar_Historical"],
    },

    Heavens_Gate: {
        tags: [
            "location_north_america", // California
            "era_modern", // 1970s
            "belief_prison_planet", // Bodies are containers
            "belief_science_fiction", // Spaceship/Next Level
            "belief_apocalypse", // Recycling of Earth
            "practice_ritual_suicide", // The Exit
            "practice_suicide", // Actual death
            "practice_violence", // Self-termination
            "practice_asceticism", // Shedding attachments/Uniforms
            "practice_body_modification", // Castration/Physical removal of gender
            "practice_personality_cult", // Marshall Applewhite (Do)
            "practice_astronomy", // Hale-Bopp comet
            "practice_scifi_aesthetics",
            "practice_chastity",
        ],
        startDate: 1974,
        endDate: 1997,
        inspiredBy: [],
    },

    Raelians: {
        tags: [
            "location_europe", // France
            "era_modern", // 1974
            "belief_science_fiction", // Elohim/Intelligent Design
            "belief_transhumanism", // Technology/Cloning immortality
            "practice_sexual_liberation", // Sensual meditation
            "practice_sex", // Free love
            "practice_initiation", // DNA transmission/Baptism
            "practice_mediumship", // Astronomy/Extraterrestrial contact
            "practice_personality_cult", // Rael
            "practice_scifi_aesthetics",
            "practice_carnal_aesthetic",
        ],
        startDate: 1974,
        endDate: null,
        inspiredBy: [],
    },

    The_Peoples_Temple: {
        tags: [
            "location_north_america", // Guyana/USA
            "era_modern", // 1955
            "belief_communalism", // Apostolic Socialism (Merged socialism)
            "belief_apocalypse", // Revolutionary Suicide
            "practice_ritual_suicide", // Flavor Aid
            "practice_suicide", // Mass death
            "practice_violence", // Murder/Coerced suicide
            "practice_communal_living", // Jonestown
            "practice_psychological_torture", // White Nights
            "practice_personality_cult", // Jim Jones
            "practice_propaganda", // Gospel choir as tool
            "practice_poverty",
            "practice_chant", // Singing was major part
            "practice_macabre_aesthetic",
            "belief_christianity", // Started as
            "belief_humanism", // Twisted form of socialist humanism
        ],
        startDate: 1955,
        endDate: 1978,
        inspiredBy: [],
    },

    Church_Universal_and_Triumphant_CUT: {
        tags: [
            "location_north_america", // Montana
            "era_modern", // 1970s
            "belief_apocalypse", // Nuclear Armageddon
            "belief_ascended_masters", // I AM Presence
            "practice_mantra", // Violet Flame decrees (rapid chanting)
            "practice_survivalism", // Bunker drills
            "practice_personality_cult", // Elizabeth Clare Prophet
            "practice_chant",
            "belief_syncretism",
        ],
        startDate: 1975,
        endDate: null,
        inspiredBy: [],
    },

    Aum_Shinrikyo: {
        tags: [
            "location_asia", // Japan
            "era_modern", // 1984
            "belief_apocalypse", // Nuclear WWIII
            "belief_science_fiction", // PSI/Anime influence
            "practice_terrorism", // Sarin gas attack
            "practice_violence", // Murder/Attack
            "practice_asceticism", // Extreme ordeal/Sleep deprivation
            "practice_transgression", // Drinking bathwater
            "practice_personality_cult", // Shoko Asahara
            "practice_mantra", // Mantra chanting
            "practice_chant",
            "practice_scifi_aesthetics",
            "practice_taboobreaking",
            "practice_crime",
            "belief_syncretism",
        ],
        startDate: 1984,
        endDate: 1995,
        inspiredBy: [],
    },

    Osho_Rajneesh_Movement: {
        tags: [
            "location_asia", // India/USA (Oregon)
            "era_modern", // 1970s
            "belief_hedonism", // Zorba the Buddha
            "practice_catharsis", // Dynamic Meditation
            "practice_sexual_liberation", // Free love
            "practice_sex", // Open sexuality
            "practice_communal_living", // Rajneeshpuram
            "practice_altered_state", // Sufi whirling
            "practice_psychological_torture", // Encounter groups (violent)
            "practice_violence", // Group assaults in therapy
            "practice_personality_cult", // Bhagwan Shree Rajneesh
            "practice_dance",
            "practice_carnal_aesthetic",
            "practice_ecstatic_aesthetic",
            "practice_crime", // Bioterror attack
            "belief_syncretism",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: [],
    },

    Thule_Society: {
        tags: [
            "location_europe", // Germany
            "era_industrial", // 1918
            "belief_occult_history", // Hyperborea/Ultima Thule
            "belief_racism", // Aryan supremacy
            "belief_aryan_race", // Esoteric Aryanism
            "belief_white_supremacy",
            "practice_political_subversion", // Infiltration of DAP
            "practice_purity_ritual", // Blood declaration (Merged purity_test)
            "practice_ritual_drama", // Thor's Hammer
            "practice_symbolism", // Sun Wheel/Swastika
            "belief_pagan",
        ],
        startDate: 1918,
        endDate: 1925,
        inspiredBy: ["Germanenorden"],
    },

    Ahnenerbe: {
        tags: [
            "location_europe", // Germany
            "era_modern", // 1935
            "belief_occult_history", // World Ice Theory/Aryan archeology (Merged pseudohistory)
            "belief_ancestral_wisdom", // Germanic paganism
            "belief_aryan_race", // Esoteric Aryanism
            "belief_white_supremacy",
            "practice_pilgrimage", // Tibet/Antarctica trips (Merged expedition)
            "practice_ritual_drama", // Solstice fires
            "practice_astronomy", // Glacial Cosmogony
            "belief_racism",
            "belief_pagan",
            "practice_corporate_aesthetic", // Bureaucratic organization
            "practice_macabre_aesthetic",
        ],
        startDate: 1935,
        endDate: 1945,
        inspiredBy: ["Thule_Society"],
    },

    Order_of_the_Black_Sun: {
        tags: [
            "location_europe", // Germany (Wewelsburg)
            "era_modern", // 1930s
            "belief_fictive_kinship", // SS as new knights
            "belief_occult_history", // Spear of Destiny
            "belief_aryan_race", // Esoteric Aryanism
            "belief_white_supremacy",
            "practice_katabasis", // The Crypt
            "practice_meditation", // Spiritual exercises
            "practice_symbolism", // Black Sun floor mosaic
            "practice_communal_living", // Castle rituals
            "belief_racism",
            "belief_pagan",
            "practice_martial_aesthetics",
            "practice_macabre_aesthetic",
        ],
        startDate: 1933,
        endDate: 1945,
        inspiredBy: ["Thule_Society"],
    },

    Skull_and_Bones: {
        tags: [
            "location_north_america", // Yale University
            "era_industrial", // 1832
            "belief_elitism", // Power brokerage
            "practice_ritual_death", // Coffin lying/Rebirth
            "practice_hazing", // Mock throat slashing/Mud wrestling
            "practice_secrecy", // Leaving the room if named
            "practice_feasting", // Club meals
            "practice_initiation", // Tap Day
            "practice_macabre_aesthetic",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1832,
        endDate: null,
        inspiredBy: ["The_Illuminati"],
    },

    Scroll_and_Key: {
        tags: [
            "location_north_america", // Yale University
            "era_industrial", // 1842
            "belief_elitism", // CSP/CCJ
            "practice_mantra", // Midnight Singing
            "practice_communal_living", // Thursday meetings
            "practice_ritual_drama", // Tap Day
            "practice_chant",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1842,
        endDate: null,
        inspiredBy: ["Skull_and_Bones"],
    },

    Cambridge_Apostles: {
        tags: [
            "location_europe", // UK
            "era_industrial", // 1820
            "belief_elitism", // Reality vs Phenomena
            "belief_antinomianism", // Absolute Candor (Higher Sodomy)
            "practice_communal_living", // Whales (Sardine meals)
            "practice_feasting", // Annual dinner
            "practice_magic", // Toast to the philistines (Merged cursing)
            "practice_intellectual_aesthetic",
            "belief_humanism",
        ],
        startDate: 1820,
        endDate: null,
        inspiredBy: [],
    },

    The_Machine: {
        tags: [
            "location_north_america", // Alabama
            "era_modern", // 20th Century
            "belief_power", // Political dominance of campus (Merged control)
            "practice_intimidation", // Burning crosses/Threats
            "practice_violence", // Implicit violence
            "practice_political_subversion", // Coerced voting
            "practice_anonymity", // Anonymous reps/Omerta
            "practice_corporate_aesthetic",
            "practice_crime",
        ],
        startDate: 1900,
        endDate: null,
        inspiredBy: [],
    },

    Knights_of_Columbus: {
        tags: [
            "location_north_america", // USA
            "era_industrial", // 1882
            "belief_christian_defense", // Catholicism/Charity
            "belief_fictive_kinship", // Fraternity
            "practice_knightly_aesthetic", // Swords/Capes/Color Corps
            "practice_ritual_drama", // Exemplifications
            "practice_feasting", // Charity dinners
            "practice_martial_aesthetics",
            "belief_christianity",
        ],
        startDate: 1882,
        endDate: null,
        inspiredBy: [],
    },

    Knights_of_Pythias: {
        tags: [
            "location_north_america", // USA/UK
            "era_industrial", // 1819
            "belief_fictive_kinship", // Friendship/Love/Truth (Triple Link)
            "practice_ritual_death", // Living Dead ritual/Skeletons
            "practice_initiation", // Chains/Binding
            "practice_feasting", // Lodge suppers
            "practice_macabre_aesthetic",
            "belief_humanism",
        ],
        startDate: 1864,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Knights_of_the_Golden_Circle: {
        tags: [
            "location_north_america", // USA
            "era_industrial", // 1854
            "belief_nationalism", // Slave empire/Confederacy (Merged imperialism)
            "belief_white_supremacy",
            "practice_paramilitary", // Drilling
            "practice_secrecy", // Secret signs
            "practice_initiation", // Castle degrees
            "belief_racism",
            "practice_martial_aesthetics",
        ],
        startDate: 1854,
        endDate: 1864,
        inspiredBy: [],
    },

    Bohemian_Grove: {
        tags: [
            "location_north_america", // California
            "era_industrial", // 1872
            "belief_elitism", // "Weaving Spiders Come Not Here"
            "practice_catharsis", // Cremation of Care (Merged belief_catharsis)
            "practice_ritual_drama", // Burning effigy (The Owl)
            "practice_communal_living", // Encampments
            "practice_feasting", // Dining circles
            "practice_transgression", // Public urination/Drunkenness
            "practice_macabre_aesthetic", // Cremation of Care is mock sacrifice
        ],
        startDate: 1872,
        endDate: null,
        inspiredBy: [],
    },

    Bilderberg_Group: {
        tags: [
            "location_europe", // Netherlands (Origin)
            "era_modern", // 1954
            "belief_politics", // Atlanticism (Merged globalism)
            "practice_secrecy", // Chatham House Rule
            "practice_feasting", // Official dinners
            "practice_corporate_aesthetic",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1954,
        endDate: null,
        inspiredBy: [],
    },

    Opus_Dei: {
        tags: [
            "location_europe", // Spain
            "era_modern", // 1928
            "belief_purity", // Work as prayer (Merged sanctification)
            "practice_body_modification", // Cilice/Discipline (Whip)
            "practice_asceticism", // Plan of Life
            "practice_initiation", // Oblation
            "practice_chastity",
            "practice_prayer",
            "belief_christianity",
        ],
        startDate: 1928,
        endDate: null,
        inspiredBy: [],
    },

    Independent_Order_of_Odd_Fellows: {
        tags: [
            "location_north_america", // USA/UK
            "era_industrial", // 1819
            "belief_fictive_kinship", // Friendship/Love/Truth (Triple Link)
            "practice_ritual_death", // Living Dead ritual/Skeletons
            "practice_initiation", // Chains/Binding
            "practice_feasting", // Lodge suppers
            "practice_macabre_aesthetic",
            "belief_humanism",
        ],
        startDate: 1819,
        endDate: null,
        inspiredBy: [],
    },

    Molly_Maguires: {
        tags: [
            "location_north_america", // Pennsylvania
            "era_industrial", // 19th Century
            "belief_justice", // Retributive justice (Merged labor_justice)
            "practice_violence", // Assassination/Sabotage
            "practice_cross_dressing", // Disguise
            "practice_secrecy", // Oath of secrecy
            "practice_crime",
        ],
        startDate: 1843,
        endDate: 1877,
        inspiredBy: [],
    },

    Carbonari: {
        tags: [
            "location_europe", // Italy
            "era_industrial", // 1800
            "belief_politics", // Liberty (Merged republicanism)
            "belief_socialism", // Christ as Charcoal Burner (Merged christian_socialism)
            "practice_ritual_drama", // Passion Play reenactment
            "practice_initiation", // The Furnace
            "belief_christianity",
            "belief_humanism",
        ],
        startDate: 1800,
        endDate: 1831,
        inspiredBy: ["Freemasonry"],
    },

    Cosa_Nostra_Sicilian_American: {
        tags: [
            "location_europe", // Calabria
            "era_industrial", // 1860s
            "belief_blood_ties", // Fara (Biological family)
            "belief_syncretism", // St. Michael veneration
            "practice_suicide_oath", // Poison pill availability
            "practice_suicide", // Coerced suicide
            "practice_violence", // Organized crime
            "practice_secrecy", // La Santa
            "practice_crime",
            "belief_christianity",
        ],
        startDate: 1860,
        endDate: null,
        inspiredBy: [],
    },

    Ndrangheta: {
        tags: [
            "location_europe", // Calabria
            "era_industrial", // 1860s
            "belief_blood_ties", // Fara (Biological family)
            "belief_syncretism", // St. Michael veneration
            "practice_suicide_oath", // Poison pill availability
            "practice_suicide", // Coerced suicide
            "practice_violence", // Organized crime
            "practice_secrecy", // La Santa
            "practice_crime",
            "belief_christianity",
        ],
        startDate: 1860,
        endDate: null,
        inspiredBy: [],
    },

    Camorra: {
        tags: [
            "location_europe", // Naples
            "era_preindustrial", // 17th Century
            "belief_nihilism", // Urban chaos
            "practice_violence", // Zumpata (Knife duel)
            "practice_transgression", // Kiss of the Leper
            "practice_initiation", // Trial by combat
            "practice_crime",
        ],
        startDate: 1600,
        endDate: null,
        inspiredBy: [],
    },

    Yakuza_Boryokudan: {
        tags: [
            "location_asia", // Japan
            "era_preindustrial", // Edo Period
            "belief_honor_code", // Ninkyo/Chivalry
            "practice_self_mutilation", // Yubitsume (Finger cutting)
            "practice_violence", // Self-harm/Gang violence
            "practice_body_modification", // Irezumi (Full body tattoo)
            "practice_hierarchy", // Oyabun-Kobun (Father-Child)
            "practice_ritual_drinking", // Sakazuki (Sake sharing)
            "practice_crime",
            "practice_corporate_aesthetic",
            "practice_martial_aesthetics",
        ],
        startDate: 1600,
        endDate: null,
        inspiredBy: [],
    },

    Triads: {
        tags: [
            "location_asia", // China
            "era_preindustrial", // 17th Century
            "belief_fictive_kinship", // Heaven and Earth Society
            "belief_numerology", // 36 Oaths/108 Heroes
            "practice_blood_rite", // Chicken beheading/Drinking blood
            "practice_violence", // Organized crime
            "practice_secrecy", // Hand signs/Slang
            "practice_crime",
            "practice_martial_aesthetics",
            "belief_syncretism",
        ],
        startDate: 1600,
        endDate: null,
        inspiredBy: [],
    },

    Russian_Mafia_Vory_v_Zakone: {
        tags: [
            "location_europe", // Russia (Gulag)
            "era_modern", // Soviet Era
            "belief_parallel_law", // Thieves' Code (Reject state)
            "practice_body_modification", // Tattoos (Biography on skin)
            "practice_violence", // Criminal enforcement
            "practice_initiation", // Coronation
            "practice_feasting", // Prison feasts
            "practice_crime",
            "belief_christianity", // Often use religious iconography
        ],
        startDate: 1920,
        endDate: null,
        inspiredBy: [],
    },

    Aryan_Brotherhood: {
        tags: [
            "location_north_america", // USA prisons
            "era_modern", // 1960s
            "belief_white_supremacy", // Blood in/Blood out
            "belief_aryan_race",
            "practice_violence", // Murder/Drug trade
            "practice_body_modification", // Tattoos (Shamrock/Swastika)
            "practice_blood_rite", // Blood in/Blood out
            "practice_secrecy", // Code of silence
            "practice_crime",
            "practice_martial_aesthetics",
            "belief_racism",
        ],
        startDate: 1964,
        endDate: null,
        inspiredBy: [],
    },

    Ku_Klux_Klan: {
        tags: [
            "location_north_america", // USA South
            "era_industrial", // 1865
            "belief_white_supremacy", // Invisible Empire
            "practice_violence", // Lynchings
            "practice_theatricality", // Robes/Cross burning
            "practice_paramilitary", // Rides
            "practice_personality_cult", // Nathan Bedford Forrest
            "practice_crime",
            "practice_macabre_aesthetic",
            "belief_racism",
            "belief_christianity",
        ],
        startDate: 1865,
        endDate: null,
        inspiredBy: ["Knights_of_the_Golden_Circle"],
    },

    Nazi_Lowriders: {
        tags: [
            "location_north_america", // California prisons
            "era_modern", // 1970s
            "belief_white_supremacy",
            "belief_aryan_race",
            "practice_violence", // Drug trade/Assaults
            "practice_body_modification", // Tattoos
            "practice_crime",
            "belief_racism",
            "practice_martial_aesthetics",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: ["Aryan_Brotherhood"],
    },

    Creativity_Movement: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1973
            "belief_white_supremacy", // RAHOWA (Racial Holy War)
            "belief_aryan_race",
            "practice_propaganda", // Little White Books
            "practice_personality_cult", // Ben Klassen
            "belief_racism",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1973,
        endDate: null,
        inspiredBy: [],
    },

    The_Order_Silent_Brotherhood: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1983
            "belief_white_supremacy", // Northwest Imperative
            "belief_aryan_race",
            "practice_terrorism", // Bank robbery/Assassination
            "practice_violence", // Armored car heists
            "practice_paramilitary", // Phineas Priesthood
            "practice_crime",
            "belief_racism",
            "practice_martial_aesthetics",
        ],
        startDate: 1983,
        endDate: 1984,
        inspiredBy: ["Creativity_Movement"],
    },

    Asatru_Folk_Assembly: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1994
            "belief_ancestral_wisdom", // Volkish Odinism
            "belief_white_supremacy", // Meta-genetics
            "belief_aryan_race",
            "practice_blood_rite", // Blot
            "practice_feasting", // Sumbel
            "practice_ritual_drama", // Kindred gatherings
            "belief_racism",
            "belief_pagan",
        ],
        startDate: 1994,
        endDate: null,
        inspiredBy: ["Wotansvolk"],
    },

    The_Turner_Diaries_Followers: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1978 (Book)
            "belief_apocalypse", // The Day of the Rope
            "belief_white_supremacy",
            "belief_aryan_race",
            "practice_terrorism", // Bombings/Lynchings
            "practice_propaganda", // Fiction as blueprint
            "belief_racism",
            "practice_martial_aesthetics",
        ],
        startDate: 1978,
        endDate: null,
        inspiredBy: ["The_Order_Silent_Brotherhood"],
    },

    Esoteric_Hitlerism: {
        tags: [
            "location_south_america", // Chile
            "era_modern", // 1970s
            "belief_occult_history", // Hyperborea
            "belief_aryan_race", // Hitler as Avatar
            "belief_white_supremacy",
            "practice_meditation", // Yoga
            "practice_astral_projection", // Inner Earth
            "belief_racism",
            "practice_scifi_aesthetics",
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: ["The_Landig_Group"],
    },

    Christian_Identity: {
        tags: [
            "location_north_america", // USA
            "era_modern", // Mid-20th C.
            "belief_conspiracy", // ZOG
            "belief_racism", // Aryan Israel
            "belief_white_supremacy",
            "practice_survivalism", // Paramilitary camps
            "practice_personality_cult", // Wesley Swift
            "practice_martial_aesthetics",
            "belief_christianity",
        ],
        startDate: 1940,
        endDate: null,
        inspiredBy: [],
    },

    Wotansvolk: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1995
            "belief_white_supremacy", // 14 Words
            "belief_aryan_race",
            "practice_blood_rite", // Blot
            "practice_ordeal", // Creed of Iron
            "practice_feasting", // Sumbel
            "belief_racism",
            "belief_pagan",
            "practice_martial_aesthetics",
        ],
        startDate: 1995,
        endDate: null,
        inspiredBy: ["Asatru_Folk_Assembly"],
    },

    The_Landig_Group: {
        tags: [
            "location_europe", // Austria
            "era_modern", // 1950s
            "belief_science_fiction", // Point 103 (Nazi base)
            "belief_racism", // Black Sun (Merged esoteric_nazism)
            "belief_aryan_race",
            "practice_propaganda", // Fiction as myth
            "practice_mediumship", // Occult communication
            "belief_racism",
            "practice_scifi_aesthetics",
        ],
        startDate: 1950,
        endDate: 1980,
        inspiredBy: ["Ahnenerbe"],
    },

    National_Renaissance_Party: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1949
            "belief_syncretism", // Theosophical Fascism
            "belief_science_fiction", // New Atlantis
            "belief_white_supremacy",
            "practice_theatricality", // Security Echelon/Uniforms
            "practice_occult_study", // Magick
            "belief_racism",
            "practice_martial_aesthetics",
        ],
        startDate: 1949,
        endDate: 1981,
        inspiredBy: ["Thule_Society"],
    },

    Germanenorden: {
        tags: [
            "location_europe", // Germany
            "era_industrial", // 1912
            "belief_purity", // Aryan Purity
            "belief_ancestral_wisdom", // Wotanism
            "belief_aryan_race",
            "belief_white_supremacy",
            "practice_ritual_drama", // Solstice
            "practice_initiation", // Lodge oaths
            "belief_racism",
            "belief_pagan",
            "practice_macabre_aesthetic",
        ],
        startDate: 1912,
        endDate: 1918,
        inspiredBy: ["Ordo_Novi_Templi"],
    },

    Ordo_Novi_Templi: {
        tags: [
            "location_europe", // Austria
            "era_industrial", // 1900
            "belief_syncretism", // Ario-Christianity
            "belief_purity", // Theozoology
            "belief_aryan_race",
            "belief_white_supremacy",
            "practice_mantra", // Castle Liturgy
            "practice_fetishism", // Flag Hoisting
            "practice_chant",
            "belief_racism",
            "practice_macabre_aesthetic",
            "practice_martial_aesthetics",
        ],
        startDate: 1900,
        endDate: 1947,
        inspiredBy: ["Thule_Society"],
    },

    Edda_Society: {
        tags: [
            "location_europe", // Germany
            "era_industrial", // 1925
            "belief_ancestral_wisdom", // Runic Ancestry
            "belief_science_fiction", // Atlantis
            "belief_aryan_race",
            "practice_mantra", // Hag All
            "practice_meditation", // Runic Meditation
            "practice_chant",
            "belief_racism",
            "belief_pagan",
        ],
        startDate: 1925,
        endDate: 1945,
        inspiredBy: ["Thule_Society"],
    },

    Vamachara_Tantra: {
        tags: [
            "location_asia", // India
            "era_ancient", // Ancient
            "belief_transgression", // Inversion of social norms
            "belief_gnosis", // Sva-Tantra (Self-freedom)
            "practice_transgression", // Panchamakara
            "practice_katabasis", // Cremation Ground
            "practice_sex_magic", // Secret Puja
            "practice_dietary_taboo_breaking", // Meat/Alcohol
            "practice_sex", // Circle rite
            "practice_chant",
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "practice_macabre_aesthetic",
            "belief_pagan",
        ],
        startDate: -500,
        endDate: null,
        inspiredBy: [],
    },

    Fraternitas_Saturni: {
        tags: [
            "location_europe", // Germany
            "era_industrial", // 1928
            "belief_shadow_work", // Saturnian Gnosis
            "belief_elitism", // Divine Isolation
            "practice_sex_magic", // Sexual Magic
            "practice_ceremonial_magic", // GOTOS Invocation (Merged evocation)
            "practice_sex", // Ritual sex
            "practice_chant",
            "practice_macabre_aesthetic",
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1928,
        endDate: null,
        inspiredBy: ["Ordo_Templi_Orientis_OTO"],
    },

    Zos_Kia_Cultus: {
        tags: [
            "location_europe", // UK
            "era_modern", // Early 20th C.
            "belief_primitivism", // Resurgence of primal self (Merged atavism)
            "belief_gnosis", // Self-Love
            "practice_sigil_magic", // Sigilization
            "practice_ordeal", // Death Posture
            "practice_macabre_aesthetic",
            "practice_carnal_aesthetic",
        ],
        startDate: 1910,
        endDate: 1948,
        inspiredBy: ["Ordo_Templi_Orientis_OTO"],
    },

    The_Yezidis: {
        tags: [
            "location_middle_east", // Iraq
            "era_medieval", // Medieval
            "belief_monotheism", // Melek Taus (Peacock Angel)
            "belief_reincarnation", // Soul purification
            "practice_procession", // Sanjak
            "practice_dietary_restriction", // Forbidden words/Lettuce (Merged taboo_avoidance)
            "practice_feasting", // Assembly feast
            "practice_prayer",
            "practice_chant",
            "belief_syncretism",
        ],
        startDate: 1100,
        endDate: null,
        inspiredBy: [],
    },

    Russian_Cosmism: {
        tags: [
            "location_europe", // Russia
            "era_industrial", // Late 19th C.
            "belief_transhumanism", // Common Task (Resurrecting ancestors)
            "belief_gnosis", // Active Christianity
            "practice_communal_living", // Museum as Temple
            "practice_body_modification", // Blood Transfusion experiments
            "practice_astronomy", // Space conquest
            "practice_scifi_aesthetics",
            "belief_christianity",
        ],
        startDate: 1870,
        endDate: 1930,
        inspiredBy: [],
    },

    Terasem_Movement: {
        tags: [
            "location_north_america", // USA
            "era_digital", // 2004
            "belief_transhumanism", // God is Technology (Merged mind_uploading)
            "belief_immortality", // Joyful Immortality
            "practice_communal_organization", // Transreligion
            "practice_astronomy", // Space colonization
            "practice_scifi_aesthetics",
        ],
        startDate: 2004,
        endDate: null,
        inspiredBy: ["Russian_Cosmism"],
    },

    Society_for_Venturism: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1986
            "belief_transhumanism", // Abolition of Death
            "belief_humanism", // Right to Freeze (Merged rights)
            "practice_funerary", // Suspension/Burial (Merged cryonics)
            "practice_scifi_aesthetics",
            "practice_corporate_aesthetic",
        ],
        startDate: 1986,
        endDate: null,
        inspiredBy: [],
    },

    Church_of_Perpetual_Life: {
        tags: [
            "location_north_america", // Florida
            "era_modern", // Modern
            "belief_transhumanism", // Aging as Disease
            "practice_communal_gathering", // Service
            "practice_body_modification", // Life extension cocktails (Merged biohacking)
            "practice_feasting", // Healthy communion
            "practice_scifi_aesthetics",
        ],
        startDate: 2013,
        endDate: null,
        inspiredBy: ["Society_for_Venturism"],
    },

    Way_of_the_Future: {
        tags: [
            "location_north_america", // USA
            "era_digital", // 2017
            "belief_transhumanism", // AI Godhead
            "belief_apocalypse", // The Transition
            "practice_offering", // Data Tithing (Merged tithing)
            "practice_personality_cult", // Anthony Levandowski
            "practice_scifi_aesthetics",
        ],
        startDate: 2017,
        endDate: null,
        inspiredBy: [],
    },

    Carpocratians: {
        tags: [
            "location_middle_east", // Alexandria
            "era_ancient", // 2nd Century
            "belief_antinomianism", // Exhausting Powers (Sin to escape)
            "belief_humanism", // Equality (Merged egalitarianism)
            "practice_body_modification", // Brand of Fire
            "practice_sex", // Agape Feast/Orgy
            "practice_transgression", // Breaking mosaic law
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "belief_christianity",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Cainites: {
        tags: [
            "location_middle_east", // Levant
            "era_ancient", // 2nd Century
            "belief_antinomianism", // Holy Sinner (Cain/Sodomites) (Merged inversion)
            "practice_transgression", // Inversion Prayer
            "practice_antinomianism", // Dissolution of Law
            "practice_prayer",
            "practice_taboobreaking",
            "belief_christianity",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Basilideans: {
        tags: [
            "location_middle_east", // Alexandria
            "era_ancient", // 2nd Century
            "belief_cosmology", // Abraxas (365 heavens)
            "practice_secrecy", // The Silence (5 years)
            "practice_talismans", // Gem Magic
            "practice_mantra", // Abrasax chant
            "practice_chant",
            "practice_intellectual_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 120,
        endDate: 300,
        inspiredBy: ["Sethian_Gnostics"],
    },

    Brethren_of_the_Free_Spirit: {
        tags: [
            "location_europe", // Europe
            "era_medieval", // 13th Century
            "belief_apotheosis", // Soul is God (Merged autotheism)
            "belief_antinomianism", // Holy Freedom (Sin is impossible)
            "practice_sex_magic", // Miraculous Bed
            "practice_sexual_liberation", // Sexual freedom
            "practice_sex", // Free love
            "practice_transgression", // Begging
            "practice_poverty",
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "belief_christianity",
        ],
        startDate: 1200,
        endDate: 1400,
        inspiredBy: [],
    },

    Adamites: {
        tags: [
            "location_europe", // Bohemia
            "era_medieval", // 15th Century
            "belief_primitivism", // Return to Edenic Innocence
            "practice_transgression", // Nudity
            "practice_sexual_liberation", // Free love
            "practice_sex", // Sexual freedom
            "practice_violence", // Raiding (Holy War)
            "practice_carnal_aesthetic",
            "practice_taboobreaking",
            "belief_christianity",
        ],
        startDate: 1400,
        endDate: 1421,
        inspiredBy: ["Brethren_of_the_Free_Spirit"],
    },

    Sabbateans_Donmeh: {
        tags: [
            "location_middle_east", // Ottoman Empire
            "era_preindustrial", // 17th Century
            "belief_redemption_through_sin", // Apostate Messiah
            "practice_transgression", // Festival of the Lamb
            "practice_sex", // Wife sharing
            "practice_personality_cult", // Sabbatai Zvi
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1666,
        endDate: 1900,
        inspiredBy: [],
    },

    Frankism: {
        tags: [
            "location_europe", // Poland
            "era_preindustrial", // 18th Century
            "belief_redemption_through_sin", // V Ladder
            "belief_messianism", // The Maiden (Shekinah)
            "practice_transgression", // Strange Fire
            "practice_sex", // Sexual ritual
            "practice_personality_cult", // Jacob Frank
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1750,
        endDate: 1791,
        inspiredBy: ["Sabbateans_Donmeh"],
    },

    Hermetic_Brotherhood_of_Luxor: {
        tags: [
            "location_europe", // Europe
            "era_industrial", // Late 19th C.
            "belief_sex_magic", // Sexual Polarity
            "practice_sex_magic", // The Voltia
            "practice_sex", // Sexual intercourse
            "practice_scrying", // Mirror Scrying
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1870,
        endDate: 1895,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Illuminates_of_Thanateros_IOT: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1978
            "belief_chaos_magic", // Meta-Paradigm (Belief as tool)
            "belief_dualism", // Eros/Thanatos
            "practice_sigil_magic", // Sigilization
            "practice_ordeal", // Death Posture
            "practice_initiation", // Novice
            "practice_macabre_aesthetic",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1978,
        endDate: null,
        inspiredBy: ["Zos_Kia_Cultus"],
    },

    Discordianism: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1957
            "belief_chaos_magic", // Sacred Chao/Eris (Merged chaos)
            "practice_subversion", // Operation Mindfuck
            "practice_dietary_taboo_breaking", // Hotdog bunless
            "practice_transgression", // Humor as weapon
            "practice_taboobreaking",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1957,
        endDate: null,
        inspiredBy: [],
    },

    Cathars_Albigensians: {
        tags: [
            "location_europe", // France
            "era_medieval", // 12th Century
            "belief_dualism", // Two Gods (Good/Evil)
            "belief_christianity", // Christ had no body (Merged docetism)
            "practice_initiation", // Consolamentum
            "practice_ritual_suicide", // Endura (Starvation)
            "practice_suicide", // Voluntary death
            "practice_secrecy", // Appareillamentum
            "practice_fasting",
            "practice_chastity",
            "practice_poverty",
            "practice_macabre_aesthetic",
            "belief_christianity",
        ],
        startDate: 1100,
        endDate: 1321,
        inspiredBy: ["Bogomils"],
    },

    Bogomils: {
        tags: [
            "location_europe", // Bulgaria
            "era_medieval", // 10th Century
            "belief_shadow_work", // Satanael (Older brother of Jesus)
            "practice_mantra", // Pater Noster
            "practice_transgression", // Rejection of cross/Mary
            "practice_prayer",
            "practice_poverty",
            "belief_christianity",
        ],
        startDate: 900,
        endDate: 1400,
        inspiredBy: ["Manichaeism"],
    },

    Order_of_the_Golden_and_Rosy_Cross: {
        tags: [
            "location_europe", // Germany
            "era_industrial", // 18th Century
            "belief_alchemy", // Alchemical Protestantism
            "belief_androgyny", // The Rebis
            "practice_alchemy", // Laboratory Work
            "practice_initiation", // Chemical Wedding
            "practice_intellectual_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1757,
        endDate: 1787,
        inspiredBy: ["Freemasonry"],
    },

    Elus_Coens: {
        tags: [
            "location_europe", // France
            "era_preindustrial", // 1767
            "belief_gnosis", // Return to divine origin (Merged reintegration)
            "practice_theurgy", // Angelic invocation
            "practice_exorcism", // Purification
            "practice_initiation", // Ordination
            "practice_prayer",
            "practice_chant",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1767,
        endDate: 1781,
        inspiredBy: ["Freemasonry"],
    },

    Societas_Rosicruciana_in_Anglia: {
        tags: [
            "location_europe", // UK
            "era_industrial", // 1867
            "belief_christianity", // Christian Rosenkreutz (Merged christian_esotericism)
            "practice_initiation", // Zelator
            "practice_study", // Paper Reading (Merged intellectual_study)
            "practice_intellectual_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1867,
        endDate: null,
        inspiredBy: ["Order_of_the_Golden_and_Rosy_Cross"],
    },

    Martinist_Order: {
        tags: [
            "location_europe", // France
            "era_industrial", // Late 19th C.
            "belief_mysticism", // Way of the Heart
            "practice_ritual_drama", // Mask and Cloak
            "practice_initiation", // S.I. (Superieur Inconnu)
            "practice_prayer",
            "practice_intellectual_aesthetic",
            "belief_christianity",
        ],
        startDate: 1884,
        endDate: null,
        inspiredBy: ["Elus_Coens"],
    },

    Society_of_Universal_Harmony_Mesmerism: {
        tags: [
            "location_europe", // France
            "era_preindustrial", // 1783
            "belief_vitalism", // Animal Magnetism
            "practice_healing", // The Baquet (Merged group_healing)
            "practice_catharsis", // The Crisis
            "practice_personality_cult", // Franz Mesmer
            "practice_ecstatic_aesthetic",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1783,
        endDate: 1793,
        inspiredBy: [],
    },

    Nauvoo_Council_of_Fifty: {
        tags: [
            "location_north_america", // Illinois
            "era_industrial", // 1844
            "belief_theocracy", // Kingdom of God on Earth
            "practice_initiation", // Endowment
            "practice_secrecy", // Oath of Vengeance
            "practice_personality_cult", // Joseph Smith
            "belief_christianity",
            "practice_martial_aesthetics",
        ],
        startDate: 1844,
        endDate: 1846,
        inspiredBy: [],
    },

    Spiritism_Kardecist_Circles: {
        tags: [
            "location_europe", // France
            "era_industrial", // 1850s
            "belief_reincarnation", // Moral evolution
            "practice_mediumship", // Seance/Automatic Writing
            "practice_energy_healing", // Passes
            "practice_mantra", // Hymns
            "practice_chant",
            "practice_prayer",
            "belief_christianity",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1857,
        endDate: null,
        inspiredBy: ["Society_of_Universal_Harmony_Mesmerism"],
    },

    Eulis_Brotherhood: {
        tags: [
            "location_north_america", // USA
            "era_industrial", // 1874
            "belief_sex_magic", // Sexual Polarity
            "practice_sex_magic", // Nuptial Moment
            "practice_sex", // Intercourse
            "practice_entheogen", // Hashish
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1874,
        endDate: 1896,
        inspiredBy: ["Hermetic_Brotherhood_of_Luxor"],
    },

    Eglise_Gnostique_Catholique: {
        tags: [
            "location_europe", // France
            "era_industrial", // 1890
            "belief_gnostic_restoration", // Cathar revival
            "practice_initiation", // Consolamentum
            "practice_ritual_meal", // Gnostic Mass
            "practice_chant",
            "practice_prayer",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1890,
        endDate: null,
        inspiredBy: ["Cathars_Albigensians"],
    },

    Rite_of_Memphis_Misraim: {
        tags: [
            "location_europe", // Europe
            "era_industrial", // 1881
            "belief_egyptian_masonry", // Arcana Arcanorum
            "practice_katabasis", // Philosophical Death
            "practice_hierarchy", // 99 Degrees
            "practice_initiation", // Pyramid rites
            "practice_macabre_aesthetic",
            "belief_syncretism",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1881,
        endDate: null,
        inspiredBy: ["Freemasonry"],
    },

    Fraternitas_Rosae_Crucis: {
        tags: [
            "location_north_america", // USA
            "era_industrial", // 1858
            "belief_soul_development", // Volitive Soul
            "practice_breathwork", // Breathing
            "practice_altered_state", // Sleep of Sialam
            "practice_initiation", // Soul consciousness
            "belief_syncretism",
        ],
        startDate: 1858,
        endDate: null,
        inspiredBy: ["Order_of_the_Golden_and_Rosy_Cross"],
    },

    Brotherhood_of_Myriam: {
        tags: [
            "location_europe", // Italy
            "era_industrial", // 1896
            "belief_therapeutic_magic", // Sacred Materialism
            "practice_healing", // Therapy
            "practice_communal_work", // Pragmatica
            "practice_divination", // Mirror rite
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1896,
        endDate: 1930,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    UR_Group: {
        tags: [
            "location_europe", // Italy
            "era_modern", // 1927
            "belief_magic", // Autarchy/Power (Merged magical_idealism)
            "practice_ceremonial_magic", // Mithraic Rite
            "practice_astral_projection", // Etheric Double
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1927,
        endDate: 1929,
        inspiredBy: ["Brotherhood_of_Myriam"],
    },

    Builders_of_the_Adytum_BOTA: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1922
            "belief_kabbalah", // Living Temple
            "practice_ritual_drama", // Pronaos
            "practice_meditation", // Sound and Color
            "practice_chant",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1922,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Fraternity_of_the_Inner_Light: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1924
            "belief_occult_history", // Western Mystery Tradition (Merged esoteric_psychology)
            "practice_ceremonial_magic", // Polarity
            "practice_visualization", // Patrols
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1924,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    Thee_Temple_ov_Psychick_Youth_TOPY: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1981
            "belief_chaos_magic", // Occulture
            "practice_sigil_magic", // Sigils (fluids/hair)
            "practice_transgression", // Psychick TV/Media manipulation
            "practice_personality_cult", // Genesis P-Orridge
            "practice_body_modification",
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
        ],
        startDate: 1981,
        endDate: 2007,
        inspiredBy: ["Illuminates_of_Thanateros_IOT"],
    },

    Brethren_of_Purity: {
        tags: [
            "location_middle_east", // Iraq
            "era_medieval", // 10th Century
            "belief_neoplatonism", // Microcosm/Macrocosm
            "practice_feasting", // Feast of Brethren
            "practice_secrecy", // Epistles
            "practice_intellectual_aesthetic",
            "belief_muslim",
            "belief_syncretism",
        ],
        startDate: 900,
        endDate: 1000,
        inspiredBy: ["Pythagoreanism"],
    },

    White_Lotus_Society: {
        tags: [
            "location_asia", // China
            "era_medieval", // Song/Qing
            "belief_millenarianism", // Kalpa Turning/Maitreya
            "practice_mantra", // Sutra Recitation
            "practice_dietary_restriction", // Vegetarian Fast
            "practice_chant",
            "practice_fasting",
            "belief_syncretism",
        ],
        startDate: 1100,
        endDate: 1900,
        inspiredBy: [],
    },

    Abakua: {
        tags: [
            "location_north_america", // Cuba
            "era_industrial", // 1830s
            "belief_fictive_kinship", // Manliness (Merged brotherhood)
            "practice_theatricality", // Ireme (Little Devil) costumes
            "practice_sound_magic", // Voice of Ekue (Secret drum)
            "practice_procession", // Processional dance
            "practice_chanting", // Efik songs
            "practice_chant",
            "practice_dance",
            "practice_ecstatic_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1830,
        endDate: null,
        inspiredBy: [],
    },

    Hamatsa_Cannibal_Society: {
        tags: [
            "location_north_america", // Pacific Northwest
            "era_preindustrial", // Traditional
            "belief_animism", // Taming Wild Spirit
            "practice_violence", // Ritual Abduction (Merged kidnapping)
            "practice_transgression", // Symbolic Cannibalism
            "practice_altered_state", // Hamatsa dance
            "practice_feasting", // Potlatch
            "practice_dance",
            "practice_taboobreaking",
            "practice_ecstatic_aesthetic",
            "belief_pagan",
        ],
        startDate: -1000,
        endDate: 1900,
        inspiredBy: [],
    },

    The_Druze: {
        tags: [
            "location_middle_east", // Levant
            "era_medieval", // 11th Century
            "belief_reincarnation", // Immediate rebirth
            "practice_secrecy", // Taqiyya (Dissimulation)
            "practice_communal_worship", // Khalwat
            "practice_initiation", // Uqqal (Knowers) vs Juhhal
            "practice_prayer",
            "belief_muslim",
            "belief_syncretism",
        ],
        startDate: 1017,
        endDate: null,
        inspiredBy: [],
    },

    False_Face_Society: {
        tags: [
            "location_north_america", // Iroquois
            "era_preindustrial", // Traditional
            "belief_animism", // Living Masks/Healing
            "practice_purification", // House Cleansing
            "practice_offering", // Tobacco
            "practice_dance", // Mask dance
            "practice_feasting", // Mush feeding
            "practice_chant",
            "practice_macabre_aesthetic", // Distorted masks
            "belief_pagan",
        ],
        startDate: -1000,
        endDate: null,
        inspiredBy: [],
    },

    Poro_and_Sande: {
        tags: [
            "location_africa", // West Africa
            "era_preindustrial", // Traditional
            "belief_parallel_law", // Gender Governance
            "practice_body_modification", // Scarification
            "practice_initiation", // Bush school
            "practice_dance", // Masked dance
            "practice_macabre_aesthetic",
            "belief_pagan",
        ],
        startDate: -500,
        endDate: null,
        inspiredBy: [],
    },

    I_Kuan_Tao: {
        tags: [
            "location_asia", // China
            "era_modern", // 1930s
            "belief_syncretism", // Five Religions
            "practice_initiation", // Three Treasures (Mantra/Mudra/Point)
            "practice_divination", // Sand Writing
            "practice_mantra", // Mantra
            "practice_chant",
            "practice_prayer",
            "belief_syncretism",
        ],
        startDate: 1930,
        endDate: null,
        inspiredBy: ["White_Lotus_Society"],
    },

    The_Sicarii: {
        tags: [
            "location_middle_east", // Judea
            "era_ancient", // 1st Century
            "belief_theocracy", // No Lord but God
            "practice_violence", // Stabbing (Sica)
            "practice_suicide", // Masada
            "practice_martial_aesthetics",
            "practice_crime",
        ],
        startDate: 50,
        endDate: 73,
        inspiredBy: [],
    },

    The_Peoples_Will_Narodnaya_Volya: {
        tags: [
            "location_europe", // Russia
            "era_industrial", // 1879
            "belief_nihilism", // Destruction of state
            "practice_technology", // Dynamite
            "practice_suicide_mission", // Living Bomb
            "practice_violence", // Assassination
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1879,
        endDate: 1891,
        inspiredBy: [],
    },

    Weather_Underground_Organization_WUO: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1969
            "belief_revolution", // War Home
            "practice_psychological_torture", // Criticism/Self-Criticism
            "practice_transgression", // Acid Tests
            "practice_sexual_liberation", // Smash monogamy/Orgies
            "practice_sex", // Group sex
            "practice_violence", // Bombings
            "practice_crime",
            "practice_carnal_aesthetic",
        ],
        startDate: 1969,
        endDate: 1977,
        inspiredBy: [],
    },

    Nxivm: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1998
            "belief_hedonism", // Joy/Success (Merged ethical_hedonism)
            "practice_body_modification", // Branding
            "practice_blackmail", // Collateral (Merged belief_blackmail)
            "practice_dietary_restriction", // Ready Zero (Starvation)
            "practice_personality_cult", // Keith Raniere
            "practice_initiation", // Sash ceremony
            "practice_sexual_slavery", // DOS
            "practice_sex", // Coerced sex
            "practice_abuse", // Physical/Mental
            "practice_violence", // Branding/Enforcement
            "practice_corporate_aesthetic",
            "practice_fasting",
            "practice_crime",
        ],
        startDate: 1998,
        endDate: 2019,
        inspiredBy: ["Scientology"],
    },

    QAnon: {
        tags: [
            "location_global", // Global
            "era_digital", // 2017
            "belief_apocalypse", // The Storm
            "belief_conspiracy", // Great Awakening/Cabal
            "practice_cryptography", // Decoding drops (Baking)
            "practice_mantra", // WWG1WGA
            "practice_personality_cult", // Q
            "practice_chant",
            "belief_syncretism",
        ],
        startDate: 2017,
        endDate: null,
        inspiredBy: [],
    },

    The_Black_Hand_Unification_or_Death: {
        tags: [
            "location_europe", // Serbia
            "era_industrial", // 1911
            "belief_nationalism", // Pan-Slavism
            "practice_secrecy", // Oath of Death
            "practice_suicide_oath", // Poison
            "practice_violence", // Assassination
            "practice_initiation", // Dagger oath
            "practice_macabre_aesthetic",
            "practice_martial_aesthetics",
            "practice_crime",
        ],
        startDate: 1911,
        endDate: 1917,
        inspiredBy: [],
    },

    Synanon: {
        tags: [
            "location_north_america", // California
            "era_modern", // 1958
            "belief_fabricated_reality", // Act As If
            "practice_psychological_torture", // The Game (Attack therapy)
            "practice_violence", // Assaults
            "practice_body_modification", // Head Shaving
            "practice_personality_cult", // Charles Dederich
            "practice_corporate_aesthetic",
        ],
        startDate: 1958,
        endDate: 1991,
        inspiredBy: [],
    },

    Sabeans_of_Harran: {
        tags: [
            "location_middle_east", // Turkey
            "era_medieval", // 8th Century
            "practice_astral_magic", // Metal Alchemy (Merged belief_astral_magic)
            "practice_blood_rite", // Planetary Liturgy
            "practice_divination", // Mystery of Head
            "practice_astronomy", // Star worship
            "practice_prayer",
            "practice_chant",
            "practice_intellectual_aesthetic",
            "belief_pagan",
        ],
        startDate: 700,
        endDate: 1100,
        inspiredBy: ["Hermetic_Circles"],
    },

    The_Church_of_Light: {
        tags: [
            "location_north_america", // Los Angeles
            "era_modern", // 1932
            "practice_divination", // Astrology (Merged belief_astrology)
            "practice_initiation", // 21 Steps
            "practice_healing", // Stellar healing
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1932,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn"],
    },

    The_Dogon_Awa_Society: {
        tags: [
            "location_africa", // Mali
            "era_preindustrial", // Traditional
            "belief_cosmology", // Sirius connection
            "practice_ritual_movement", // Sigui (60-year walk)
            "practice_secrecy", // Bush Language
            "practice_dance", // Dama dance
            "practice_astronomy", // Sirius cycle
            "practice_chant",
            "practice_ecstatic_aesthetic",
            "belief_pagan",
        ],
        startDate: -500,
        endDate: null,
        inspiredBy: [],
    },

    Cult_of_Starry_Wisdom: {
        tags: [
            "location_fictional", // Lovecraft
            "era_fictional", // 19th Century
            "belief_nihilism", // Haunter of Dark
            "practice_scrying", // Shining Trapezohedron
            "practice_blood_rite", // Feast of Shadows
            "practice_violence", // Sacrifice
            "practice_mantra", // Alien litany
            "practice_chant",
            "practice_macabre_aesthetic",
            "practice_scifi_aesthetics",
        ],
        startDate: 1844,
        endDate: 1877,
        inspiredBy: [],
    },

    The_Desposyni: {
        tags: [
            "location_europe", // Europe
            "era_modern", // Modern Mythos
            "belief_bloodline", // Sangreal (Jesus Bloodline)
            "practice_secrecy", // Genealogical Keeping
            "practice_brotherhood", // Secret Guard
            "belief_christianity",
        ],
        startDate: 1980,
        endDate: null,
        inspiredBy: [],
    },

    The_Ebionites: {
        tags: [
            "location_middle_east", // Judea
            "era_ancient", // 2nd Century
            "belief_christianity", // Jesus was human prophet (Merged adoptionism)
            "practice_dietary_restriction", // Vegetarianism
            "practice_communal_living", // Synagogues
            "practice_feasting", // Passover
            "practice_prayer",
            "practice_fasting",
            "practice_poverty",
            "belief_christianity",
        ],
        startDate: 100,
        endDate: 400,
        inspiredBy: [],
    },

    Mormon_Fundamentalist_Bloodlines: {
        tags: [
            "location_north_america", // Utah
            "era_industrial", // 19th Century
            "belief_patriarchy", // Patriarchal Order
            "practice_sex", // Plural Marriage (Merged polygamy)
            "practice_secrecy", // Placement
            "practice_personality_cult", // The Prophet
            "practice_prayer",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1890,
        endDate: null,
        inspiredBy: ["Nauvoo_Council_of_Fifty"],
    },

    The_Black_Madonna: {
        tags: [
            "location_europe", // Europe
            "era_medieval", // 11th Century
            "belief_shadow_work", // Nigredo/Earth Mother
            "practice_incubation", // Sleeping in crypts
            "practice_candle_magic", // Green Candle
            "practice_mantra", // Litanies
            "practice_chant",
            "practice_prayer",
            "practice_macabre_aesthetic",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1000,
        endDate: null,
        inspiredBy: [],
    },

    Vodou_Ezili_Danto: {
        tags: [
            "location_north_america", // Haiti
            "era_preindustrial", // 18th Century
            "belief_matriarchy", // Warrior Mother
            "practice_blood_rite", // Petro Rites (Pig sacrifice)
            "practice_violence", // Animal sacrifice
            "practice_body_modification", // Scars
            "practice_altered_state", // Frenzied dance
            "practice_mantra", // Songs of rage
            "practice_dance",
            "practice_chant",
            "practice_ecstatic_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1700,
        endDate: null,
        inspiredBy: ["The_Black_Madonna"],
    },

    Order_of_Phosphorus: {
        tags: [
            "location_north_america", // Texas
            "era_modern", // 2000s
            "belief_dark_side", // Adversarial Feminine (Merged luciferianism)
            "practice_sex_magic", // Succubus Rite
            "practice_sex", // Ritual sex
            "practice_ceremonial_magic", // Dragon Circle
            "practice_mantra", // Luciferian chant
            "practice_chant",
            "practice_carnal_aesthetic",
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 2000,
        endDate: null,
        inspiredBy: ["Temple_of_the_Black_Light"],
    },

    Qliphothic_Qabalah: {
        tags: [
            "location_europe", // Spain
            "era_medieval", // 13th Century
            "belief_dualism", // Sitra Ahra (Other Side)
            "practice_katabasis", // Tunnel Work
            "practice_transgression", // Breaking Vessels
            "practice_mantra", // Shadow names
            "practice_chant",
            "practice_macabre_aesthetic",
            "practice_taboobreaking",
            "belief_syncretism",
        ],
        startDate: 1200,
        endDate: null,
        inspiredBy: ["The_Safed_Circle_Lurianic_Kabbalah"],
    },

    The_Sons_of_Freedom_Doukhobors: {
        tags: [
            "location_north_america", // Canada
            "era_industrial", // 1900s
            "belief_anarchism", // No King but God
            "practice_transgression", // Nude Marches
            "practice_fire_ritual", // Burning buildings/Symbols
            "practice_mantra", // Psalms
            "practice_chant",
            "practice_taboobreaking",
            "practice_poverty",
            "belief_christianity",
        ],
        startDate: 1900,
        endDate: 1960,
        inspiredBy: [],
    },

    The_Numbers_Gang_26s_27s_28s: {
        tags: [
            "location_africa", // South Africa
            "era_modern", // Late 19th C.
            "belief_parallel_law", // Time is Law
            "practice_body_modification", // Slashed Smile (Glasgow Smile)
            "practice_ritual_drama", // Court military structure
            "practice_hazing", // Umbrella test
            "practice_sexual_slavery", // Wyfies
            "practice_sex", // Rape/Coercion
            "practice_violence", // Gang enforcement
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1890,
        endDate: null,
        inspiredBy: [],
    },

    La_Familia_Michoacana: {
        tags: [
            "location_north_america", // Mexico
            "era_modern", // 2006
            "belief_divine_justice", // Cartel as religious order
            "practice_violence", // Rolling Heads on dancefloor
            "practice_purity_ritual", // Prohibition of drugs for members
            "practice_personality_cult", // El Mas Loco
            "practice_crime",
            "practice_macabre_aesthetic",
            "practice_prayer",
            "belief_syncretism",
        ],
        startDate: 2006,
        endDate: null,
        inspiredBy: [],
    },

    Five_Percent_Nation_NGE: {
        tags: [
            "location_north_america", // Harlem
            "era_modern", // 1964
            "belief_numerology", // Supreme Mathematics
            "practice_secrecy", // Word is Bond
            "practice_catechism", // Show and Prove
            "practice_mantra", // Dropping science
            "practice_personality_cult", // Allah the Father
            "practice_chant",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
            "belief_muslim",
        ],
        startDate: 1964,
        endDate: null,
        inspiredBy: [],
    },

    Pana_Wave_Laboratory: {
        tags: [
            "location_asia", // Japan
            "era_modern", // 1977
            "belief_science_fiction", // Scalar waves/Communist attack
            "practice_purity_ritual", // White Cloth covering everything
            "practice_communal_living", // Caravan
            "practice_personality_cult", // Yuko Chino
            "practice_scifi_aesthetics",
        ],
        startDate: 1977,
        endDate: 2003,
        inspiredBy: [],
    },

    Aumism_Mandarom: {
        tags: [
            "location_europe", // France
            "era_modern", // 1969
            "belief_messianism", // Cosmoplanetary Messiah
            "practice_ritual_drama", // Laser Liturgy
            "practice_theatricality", // Lemurian Reenactment
            "practice_personality_cult", // Gilbert Bourdin
            "practice_scifi_aesthetics",
            "practice_ecstatic_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1969,
        endDate: null,
        inspiredBy: ["Martinist_Order", "Freemasonry", "Theosophy"],
    },

    Chen_Tao_True_Way: {
        tags: [
            "location_north_america", // Texas
            "era_modern", // 1990s
            "belief_science_fiction", // Nuclear Reincarnation
            "practice_ritual_clothing", // White Cowboy Outfits
            "practice_divination", // Finding God in a ring
            "practice_personality_cult", // Hon-Ming Chen
            "practice_scifi_aesthetics",
            "belief_syncretism",
        ],
        startDate: 1993,
        endDate: 2001,
        inspiredBy: ["I_Kuan_Tao", "White_Lotus_Society"],
    },

    Movement_for_Restoration_Ten_Commandments: {
        tags: [
            "location_africa", // Uganda
            "era_modern", // 1989
            "belief_apocalypse", // Virgin Program
            "practice_secrecy", // Sign Language only/Vow of silence
            "practice_ritual_suicide", // Sealed Church fire
            "practice_violence", // Mass murder by fire
            "practice_personality_cult", // Credonia Mwerinde
            "practice_macabre_aesthetic",
            "practice_poverty",
            "practice_chastity",
            "practice_prayer",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1989,
        endDate: 2000,
        inspiredBy: [],
    },

    The_Safed_Circle_Lurianic_Kabbalah: {
        tags: [
            "location_middle_east", // Safed
            "era_preindustrial", // 16th Century
            "belief_apocalypse", // Shattering of Vessels (Merged cosmic_catastrophe)
            "belief_messianism", // Repairing the world (Merged tikkun)
            "practice_katabasis", // Exile (wandering fields)
            "practice_meditation", // Yihudim (Unifications)
            "practice_mantra", // Lecha Dodi
            "practice_chant",
            "practice_prayer",
            "practice_fasting",
            "practice_intellectual_aesthetic",
        ],
        startDate: 1570,
        endDate: 1620,
        inspiredBy: ["Yordei_Merkavah_Hechalot_Mystics"],
    },

    Yordei_Merkavah_Hechalot_Mystics: {
        tags: [
            "location_middle_east", // Judea
            "era_ancient", // 200-600 CE
            "belief_ascent", // Descent is Ascent (Irony)
            "practice_theurgy", // Seals/Names
            "practice_meditation", // Posture of Elijah (Head between knees)
            "practice_mantra", // Hymns of Power
            "practice_chant",
            "practice_prayer",
            "practice_ecstatic_aesthetic",
        ],
        startDate: 100,
        endDate: 1000,
        inspiredBy: [],
    },

    Lev_Tahor: {
        tags: [
            "location_global", // Global
            "era_modern", // 1988
            "belief_politics", // Rejection of State (Merged anti_zionism)
            "practice_ritual_clothing", // Burqa-like robes
            "practice_dietary_restriction", // Hyper Kashrut
            "practice_arranged_marriage", // Child Marriage
            "practice_abuse", // Child abuse
            "practice_personality_cult", // Shlomo Helbrans
            "practice_prayer",
            "practice_fasting",
            "practice_poverty",
            "practice_chastity", // Strict modesty codes
        ],
        startDate: 1988,
        endDate: null,
        inspiredBy: [],
    },

    The_Kabbalah_Centre: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1965
            "belief_transhumanism", // Spirituality as Technology (Merged belief_technology)
            "practice_divination", // Zohar Scanning (Merged bibliomancy)
            "practice_talismans", // Red String
            "practice_purity_ritual", // Kabbalah Water
            "practice_personality_cult", // Philip Berg
            "practice_corporate_aesthetic",
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1965,
        endDate: null,
        inspiredBy: ["The_Safed_Circle_Lurianic_Kabbalah"],
    },

    Rite_Operatif_de_Salomon: {
        tags: [
            "location_europe", // France
            "era_modern", // 1960s
            "belief_theurgy", // Ceremonial Magic
            "practice_divination", // Pendulum
            "practice_purification", // Ordination
            "practice_exorcism", // Exorcist rite
            "practice_prayer",
            "practice_chant",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 1960,
        endDate: null,
        inspiredBy: ["Martinist_Order", "Elus_Coens"],
    },

    Ordre_Kabbalistique_de_la_Rose_Croix_OKRC: {
        tags: [
            "location_europe", // Paris
            "era_industrial", // 1888
            "practice_intellectual_aesthetic", // Intellectual Magia (Merged magical_intellectualism)
            "practice_magical_warfare", // Battles with other orders
            "practice_initiation", // University-style exams
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1888,
        endDate: null,
        inspiredBy: ["Elus_Coens", "Order_of_the_Golden_and_Rosy_Cross"],
    },

    Chevaliers_Bienfaisants_de_la_Cite_Sainte_CBCS: {
        tags: [
            "location_europe", // France
            "era_preindustrial", // 1778
            "belief_christianity", // Active Christianity (Merged christian_chivalry)
            "practice_knightly_aesthetic", // Dubbing/Swords
            "practice_secrecy", // Secret Instructions
            "practice_charity", // Silent philanthropy
            "practice_martial_aesthetics",
            "practice_prayer",
            "belief_christianity",
        ],
        startDate: 1778,
        endDate: null,
        inspiredBy: ["Elus_Coens", "Knights_Templar_Historical", "Freemasonry"],
    },

    Rodnovery_Slavic_Native_Faith: {
        tags: [
            "location_europe", // Russia, Ukraine, Poland, Belarus
            "era_modern", // 1990s Revival (Roots in antiquity)
            "belief_animism", // Living World/Genius Loci
            "belief_polytheism", // Many Gods, One Rod
            "belief_ancestral_wisdom", // Cult of the Kin (Rod)
            "practice_feasting", // Bratina (Ritual Cup)
            "practice_fire_ritual", // Sacred Fire (Kroda)
            "practice_divination", // Casting Lots/Horse Oracle
            "practice_ritual_clothing", // Vyshyvanka (Embroidery)
            "practice_chant", // Slava (Glorification)
            "belief_pagan",
            "practice_ecstatic_aesthetic",
        ],
        startDate: 1990,
        endDate: null,
        inspiredBy: [],
    },

    Yngliism_Old_Believers: {
        tags: [
            "location_europe", // Russia (Omsk/Siberia)
            "era_modern", // 1992 Foundation
            "belief_science_fiction", // Paleo-contact/Spaceships
            "belief_aryan_race", // Four Root Races
            "belief_dualism", // Light vs Dark Forces
            "practice_energy_work", // 9 Chakras System
            "practice_purity_ritual", // Telegony/Blood purity
            "practice_paramilitary", // Wolf Legions
            "practice_scifi_aesthetics", // Vaitmanas
            "belief_racism",
        ],
        startDate: 1992,
        endDate: null,
        inspiredBy: ["Rodnovery_Slavic_Native_Faith", "Thule_Society", "The_Landig_Group"],
    },

    Zadruga_Polish_Nationalists: {
        tags: [
            "location_europe", // Poland
            "era_modern", // 1937 / Modern Revival
            "belief_nationalism", // Collectivism
            "belief_vitalism", // Will to Power
            "practice_intellectual_study", // Stachniuk's writings
            "practice_symbolism", // Toporzeł (Axe-Eagle)
            "practice_fictive_kinship", // National Community
            "practice_martial_aesthetics",
            "belief_pagan",
        ],
        startDate: 1937,
        endDate: null,
        inspiredBy: [],
    },

    Sylenkoism_RUNVira: {
        tags: [
            "location_europe", // Ukraine/USA
            "era_modern", // 1966
            "belief_monotheism", // Dazhboh
            "belief_nationalism", // Ukrainian superiority
            "practice_chant", // Mantra-like hymns
            "practice_ritual_clothing", // Embroidered shirts
            "practice_purity_ritual", // Rejection of alcohol
            "practice_intellectual_aesthetic",
            "belief_pagan",
        ],
        startDate: 1966,
        endDate: null,
        inspiredBy: [],
    },

    Acephale: {
        tags: [
            "location_europe", // Paris
            "era_modern", // 1930s
            "belief_nihilism", // Religion without a god
            "belief_sacred_sociology", // Community through sacrifice
            "practice_transgression", // Rejection of reason (Headless)
            "practice_meditation", // Silent forest meetings
            "practice_macabre_aesthetic", // Headless man imagery
            "practice_ritual_drama", // The Unconsummated Sacrifice
            "belief_humanism", // Anti-fascist
        ],
        startDate: 1936,
        endDate: 1939,
        inspiredBy: [],
    },

    Cicada_3301: {
        tags: [
            "location_global", // Internet/Digital
            "era_digital", // 2012
            "belief_gnosis", // Liberation of information
            "belief_cryptography", // Prime numbers/Encryption
            "practice_cryptography", // Decrypting Liber Primus
            "practice_pilgrimage", // GPS coordinate hunts
            "practice_intellectual_aesthetic",
            "practice_anonymity",
        ],
        startDate: 2012,
        endDate: null,
        inspiredBy: [],
    },

    The_Cacophony_Society: {
        tags: [
            "location_north_america", // San Francisco
            "era_modern", // 1986
            "belief_chaos_magic", // Zone Theory (TAZ)
            "belief_hedonism", // Experiences over spectacle
            "practice_subversion", // Pranks/Santacon
            "practice_transgression", // Entering forbidden zones
            "practice_theatricality", // Costumed rampages
            "practice_ecstatic_aesthetic",
        ],
        startDate: 1986,
        endDate: null,
        inspiredBy: [],
    },

    Federation_of_Damanhur: {
        tags: [
            "location_europe", // Italy
            "era_modern", // 1975
            "belief_communalism", // Eco-spiritual commune
            "belief_science_fiction", // Time travel/Self-sufficiency
            "practice_communal_living", // Nucleo communities
            "practice_art_magic", // Great Excavation (Temples of Humankind)
            "practice_energy_work", // Plant music/Synchronic lines
            "belief_syncretism",
        ],
        startDate: 1975,
        endDate: null,
        inspiredBy: [],
    },

    The_Khlysty: {
        tags: [
            "location_europe", // Russia
            "era_preindustrial", // 17th Century
            "belief_redemption_through_sin", // Sin to obtain forgiveness
            "belief_incarnation", // Becoming Christ/Mother of God
            "practice_altered_state", // Radeniye (Zeal/Spinning)
            "practice_sex", // Svalnyi Grekh (Group sin/Orgy)
            "practice_dance",
            "practice_chant",
            "belief_christianity",
        ],
        startDate: 1645,
        endDate: 1900,
        inspiredBy: [],
    },

    Situationist_International: {
        tags: [
            "location_europe", // France
            "era_modern", // 1957
            "belief_revolution", // Anti-Spectacle
            "practice_psychogeography", // The Derive (Drift)
            "practice_subversion", // Detournement (Hijacking art)
            "practice_intellectual_aesthetic",
            "belief_humanism",
        ],
        startDate: 1957,
        endDate: 1972,
        inspiredBy: [],
    },

    The_Lunar_Society: {
        tags: [
            "location_europe", // UK (Birmingham)
            "era_preindustrial", // 1765
            "belief_enlightenment", // Science and Technology
            "belief_humanism",
            "practice_feasting", // Full Moon dinners
            "practice_intellectual_study", // Experiments
            "practice_intellectual_aesthetic",
        ],
        startDate: 1765,
        endDate: 1813,
        inspiredBy: [],
    },

    The_Pantisocracy: {
        tags: [
            "location_europe", // UK (Planned for USA)
            "era_preindustrial", // 1794
            "belief_communalism", // Aspheterism (No property)
            "belief_humanism", // Egalitarian utopia
            "practice_intellectual_study", // Radical lectures
        ],
        startDate: 1794,
        endDate: 1795,
        inspiredBy: [],
    },

    The_Diodati_Circle: {
        tags: [
            "location_europe", // Switzerland
            "era_industrial", // 1816
            "belief_dark_romanticism", // The Sublime
            "belief_vitalism", // Galvanism
            "practice_storytelling", // Ghost story contest
            "practice_entheogen", // Laudanum/Opium
            "practice_intellectual_aesthetic",
            "practice_macabre_aesthetic",
        ],
        startDate: 1816,
        endDate: 1816,
        inspiredBy: [],
    },

    Silver_Legion_of_America: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1933
            "belief_fascism", // Christian Economics
            "belief_white_supremacy",
            "belief_occult_history", // Pelley's metaphysics
            "practice_paramilitary", // Silver Shirts
            "practice_symbolism", // Scarlet L
            "practice_martial_aesthetics",
        ],
        startDate: 1933,
        endDate: 1941,
        inspiredBy: ["Germanenorden"], // Modeled on Brownshirts
    },

    Hells_Angels_MC: {
        tags: [
            "location_north_america", // California
            "era_modern", // 1948
            "belief_brotherhood", // Angels Forever, Forever Angels
            "belief_elitism", // The One Percent
            "practice_initiation", // Prospecting/Hazing
            "practice_violence", // Enforcement
            "practice_ritual_clothing", // The Patch/Colors
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1948,
        endDate: null,
        inspiredBy: [],
    },

    The_Bandidos_MC: {
        tags: [
            "location_north_america", // Texas
            "era_modern", // 1966
            "belief_brotherhood", // No Mercy
            "practice_initiation", // Urinating on the vest
            "practice_ritual_clothing", // Fat Mexican patch
            "practice_violence",
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1966,
        endDate: null,
        inspiredBy: [],
    },

    The_Mongols_MC: {
        tags: [
            "location_north_america", // California
            "era_modern", // 1969
            "belief_brotherhood", // Respect Few Fear None
            "practice_ritual_clothing", // The Cut (Genghis Khan)
            "practice_transgression", // Wing Party (Historical)
            "practice_violence", // War with Hells Angels
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1969,
        endDate: null,
        inspiredBy: [],
    },

    The_Outlaws_MC: {
        tags: [
            "location_north_america", // Illinois
            "era_modern", // 1935
            "belief_brotherhood", // God Forgives, Outlaws Don't
            "practice_symbolism", // Charlie (Skull)
            "practice_violence",
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1935,
        endDate: null,
        inspiredBy: [],
    },

    The_Pagans_MC: {
        tags: [
            "location_north_america", // Maryland
            "era_modern", // 1959
            "belief_pagan", // Norse Fire/Surtr symbolism
            "belief_brotherhood", // Live Pagan Die Pagan
            "practice_ritual_clothing", // Cut-off denim
            "practice_violence",
            "practice_crime",
            "practice_martial_aesthetics",
        ],
        startDate: 1959,
        endDate: null,
        inspiredBy: [],
    },

    The_Thuggee: {
        tags: [
            "location_asia", // India
            "era_preindustrial", // 14th-19th Century
            "belief_syncretism", // Kali/Bhavani worship
            "belief_determinism", // Fate/Omens
            "practice_violence", // Strangulation (Rumal)
            "practice_ritual_murder", // Sacrifice to Kali
            "practice_divination", // Omens (Lizard/Hare)
            "practice_crime",
            "practice_macabre_aesthetic",
        ],
        startDate: 1350,
        endDate: 1840,
        inspiredBy: [],
    },

    The_Aghori_Sadhus: {
        tags: [
            "location_asia", // India
            "era_medieval", // Medieval
            "belief_gnosis", // Non-duality
            "belief_transgression", // Taboo breaking
            "practice_cannibalism", // Necrophagy (Ritual)
            "practice_katabasis", // Shava Sadhana (Corpse sitting)
            "practice_macabre_aesthetic", // Skull cups (Kapala)
            "practice_asceticism",
            "belief_pagan",
        ],
        startDate: 1000,
        endDate: null,
        inspiredBy: [],
    },

    The_Hellfire_Club: {
        tags: [
            "location_europe", // UK
            "era_preindustrial", // 1746
            "belief_thelema", // Fay ce que vouldras (Do what thou wilt)
            "belief_hedonism", // Pagan revival (Bacchus/Venus)
            "practice_feasting", // Chapter room dinners
            "practice_transgression", // Mockery of religion
            "practice_katabasis", // Cave journey (Styx)
            "practice_carnal_aesthetic",
        ],
        startDate: 1746,
        endDate: 1766,
        inspiredBy: [],
    },

    Order_of_the_Pug_Mops_Orden: {
        tags: [
            "location_europe", // Bavaria
            "era_preindustrial", // 1740
            "belief_brotherhood", // Loyalty (Pug symbol)
            "belief_equality", // Gender equality
            "practice_initiation", // Kissing the pug
            "practice_chant", // Barking
            "practice_theatricality", // Dog collars
        ],
        startDate: 1740,
        endDate: 1780,
        inspiredBy: ["Freemasonry"],
    },

    The_Leopard_Society_Anyoto: {
        tags: [
            "location_africa", // West Africa
            "era_industrial", // Late 19th C.
            "belief_animism", // Totemic Power
            "belief_power", // Political terror
            "practice_ritual_murder", // Mauling with iron claws
            "practice_cannibalism", // Consuming vitals
            "practice_fetishism", // Borfima medicine
            "practice_macabre_aesthetic",
            "practice_crime",
        ],
        startDate: 1890,
        endDate: 1950,
        inspiredBy: [],
    },

    Palo_Mayombe: {
        tags: [
            "location_north_america", // Cuba
            "era_preindustrial", // 19th Century
            "belief_necromancy", // Control of Dead (Nfumbi)
            "practice_blood_rite", // Feeding the Cauldron
            "practice_ceremonial_magic", // Nganga creation
            "practice_body_modification", // Rayamiento (Scratching)
            "practice_macabre_aesthetic", // Bones/Grave dirt
            "belief_syncretism",
        ],
        startDate: 1850,
        endDate: null,
        inspiredBy: [],
    },

    The_Boxers_Yihetuan: {
        tags: [
            "location_asia", // China
            "era_industrial", // 1899
            "belief_animism", // Spirit Possession
            "belief_magic", // Spiritual Invulnerability
            "practice_possession", // Trance
            "practice_talismans", // Ash charms
            "practice_violence", // Anti-colonial rebellion
            "practice_martial_aesthetics",
        ],
        startDate: 1899,
        endDate: 1901,
        inspiredBy: ["White_Lotus_Society"],
    },

    Cult_of_Dionysus_Maenads: {
        tags: [
            "location_europe", // Greece
            "era_ancient", // Ancient
            "belief_ecstasy", // Divine Madness
            "belief_pagan", // Death/Rebirth
            "practice_altered_state", // Frenzy/Intoxication
            "practice_violence", // Sparagmos (Tearing apart)
            "practice_cannibalism", // Omophagia (Eating raw flesh)
            "practice_dance", // Nocturnal Thiasoi
            "practice_ecstatic_aesthetic",
        ],
        startDate: -1200,
        endDate: 400,
        inspiredBy: [],
    },

    Cult_of_Isis_Osiris: {
        tags: [
            "location_middle_east", // Egypt/Rome
            "era_ancient", // Ancient
            "belief_resurrection", // Eternal Life
            "belief_pagan", // Sacred Family
            "practice_procession", // Navigium Isidis
            "practice_ritual_drama", // Passion Play of Osiris
            "practice_initiation", // Temple crypt/Stole of Olympias
            "practice_ecstatic_aesthetic",
        ],
        startDate: -2500,
        endDate: 400,
        inspiredBy: [],
    },

    Ophite_Serpent_Gnostics: {
        tags: [
            "location_middle_east", // Mediterranean
            "era_ancient", // 1st-3rd Century
            "belief_gnosis", // Serpent Liberator
            "belief_dualism", // Archons/Planetary spheres
            "practice_ritual_meal", // Serpent Eucharist
            "practice_ceremonial_magic", // Diagram Rites
            "practice_taboobreaking",
            "belief_christianity",
            "belief_syncretism",
        ],
        startDate: 100,
        endDate: 300,
        inspiredBy: [],
    },

    Benandanti: {
        tags: [
            "location_europe", // Italy
            "era_medieval", // 16th Century
            "belief_animism", // Night Battles
            "belief_witchcraft", // Fighting witches
            "practice_astral_projection", // Trance Journey
            "practice_fictive_kinship", // Born with the Caul
            "belief_syncretism",
        ],
        startDate: 1575,
        endDate: 1675,
        inspiredBy: [],
    },

    Nizari_Ismaili_Assassins: {
        tags: [
            "location_middle_east", // Persia
            "era_medieval", // 11th Century
            "belief_gnosis", // Ta'wil (Inner Reality)
            "belief_apocalypse", // Qiyamat (Resurrection)
            "practice_violence", // Fedayeen (Assassination)
            "practice_obedience", // Loyalty to Old Man of the Mountain
            "practice_martial_aesthetics",
            "belief_muslim",
        ],
        startDate: 1090,
        endDate: 1256,
        inspiredBy: [],
    },

    Haitian_Vodou: {
        tags: [
            "location_north_america", // Haiti
            "era_preindustrial", // 18th Century
            "belief_animism", // Lwa
            "belief_syncretism", // West African/Catholic
            "practice_possession", // Mounting the horse
            "practice_ceremonial_magic", // Veve drawing
            "practice_initiation", // Kanzo/Fire test
            "practice_ecstatic_aesthetic",
        ],
        startDate: 1700,
        endDate: null,
        inspiredBy: [],
    },

    Tibetan_Chod_and_Ngakpa_Traditions: {
        tags: [
            "location_asia", // Tibet
            "era_medieval", // 11th Century
            "belief_self_sacrifice", // Offer the Self
            "practice_meditation", // Chod Rite (Feeding demons)
            "practice_visualization", // Spirit Feeding
            "practice_macabre_aesthetic", // Kangling/Damaru
            "belief_syncretism", // Buddhism/Shamanism
        ],
        startDate: 1050,
        endDate: null,
        inspiredBy: [],
    },

    Ogboni: {
        tags: [
            "location_africa", // Nigeria
            "era_preindustrial", // Traditional
            "belief_animism", // Earth Sacred (Ile)
            "belief_justice", // Ancestral Truth
            "practice_symbolism", // Edan (Iron figures)
            "practice_secrecy", // Secret handshakes
            "practice_politics", // Checking the King
            "belief_pagan",
        ],
        startDate: 1000,
        endDate: null,
        inspiredBy: [],
    },

    Siberian_Shamanic_Clans: {
        tags: [
            "location_asia", // Siberia
            "era_preindustrial", // Ancient
            "belief_animism", // Three Worlds
            "belief_mediumship", // Spirit Familiars
            "practice_altered_state", // Drum Trance
            "practice_healing", // Soul Retrieval
            "practice_ritual_clothing", // Mirror Armour
            "practice_ecstatic_aesthetic",
            "belief_pagan",
        ],
        startDate: -2000,
        endDate: null,
        inspiredBy: [],
    },

    Aztec_Priestly_Order: {
        tags: [
            "location_north_america", // Mexico
            "era_medieval", // 14th Century
            "belief_cosmology", // Cosmic Debt
            "belief_apocalypse", // New Fire
            "practice_ritual_murder", // Heart Offering
            "practice_self_mutilation", // Bloodletting
            "practice_astronomy", // Venus Warfare
            "practice_macabre_aesthetic",
            "belief_pagan",
        ],
        startDate: 1325,
        endDate: 1521,
        inspiredBy: [],
    },

    Order_of_Nine_Angles: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1970s
            "belief_satanism", // Theistic/Atheistic mix
            "belief_social_darwinism", // Culling
            "belief_apocalypse", // Aeonics
            "practice_transgression", // Insight Roles
            "practice_violence", // Culling
            "practice_ordeal", // Physical challenges
            "practice_intellectual_aesthetic", // Star Game
            "practice_taboobreaking",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: [],
    },

    Kaula_Tantra: {
        tags: [
            "location_asia", // India
            "era_medieval", // Medieval
            "belief_gnosis", // Kundalini
            "belief_nonduality", // Unity of Opposites
            "practice_transgression", // Panchamakara (5 Ms)
            "practice_sex_magic", // Chakra/Yoni Puja
            "practice_taboobreaking",
            "practice_carnal_aesthetic",
            "belief_pagan",
        ],
        startDate: 800,
        endDate: null,
        inspiredBy: ["Vamachara_Tantra"],
    },

    Trika_Kashmir_Shaivism: {
        tags: [
            "location_asia", // Kashmir
            "era_medieval", // 8th Century
            "belief_nonduality", // Spanda (Vibration)
            "belief_gnosis", // Recognition (Pratyabhijna)
            "practice_energy_work", // Mantra Nyasa
            "practice_visualization", // Chakra Yoga
            "practice_intellectual_aesthetic",
            "belief_pagan",
        ],
        startDate: 800,
        endDate: null,
        inspiredBy: [],
    },

    Vajrayana_Tantric_Order: {
        tags: [
            "location_asia", // Tibet
            "era_medieval", // 8th Century
            "belief_gnosis", // Deity Yoga
            "practice_visualization", // Mandala Initiation
            "practice_meditation", // Charnel Ground Rites
            "practice_funerary", // Phowa
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 700,
        endDate: null,
        inspiredBy: [],
    },

    Nath_Yogis: {
        tags: [
            "location_asia", // India
            "era_medieval", // Medieval
            "belief_magic", // Siddhi (Powers)
            "belief_alchemy", // Amrita (Immortality)
            "practice_body_modification", // Kanphata (Ear splitting)
            "practice_yoga", // Hatha Yoga/Khechari Mudra
            "practice_asceticism", // Dhuni (Ash)
            "belief_pagan",
        ],
        startDate: 1000,
        endDate: null,
        inspiredBy: [],
    },

    Bauls_of_Bengal: {
        tags: [
            "location_asia", // Bengal
            "era_medieval", // Medieval
            "belief_mysticism", // Man of the Heart
            "belief_syncretism", // Sufi/Vaishnava
            "practice_ecstatic_aesthetic", // Ecstatic Song/Dance
            "practice_breathwork", // Breath Mysticism
            "practice_poverty", // Wandering Fakirs
        ],
        startDate: 1400,
        endDate: null,
        inspiredBy: [],
    },

    Shakta_Sahajiya: {
        tags: [
            "location_asia", // Bengal
            "era_medieval", // Medieval
            "belief_tantra", // Divine Couple
            "practice_sex_magic", // Maithuna/Retention
            "practice_secrecy", // Twilight Language
            "practice_carnal_aesthetic",
            "belief_pagan",
        ],
        startDate: 1500,
        endDate: null,
        inspiredBy: [],
    },

    Theosophical_Society: {
        tags: [
            "location_north_america", // New York/India
            "era_industrial", // 1875
            "belief_syncretism", // Ancient Wisdom
            "belief_evolution", // Root Races
            "belief_ascended_masters", // Mahatmas
            "practice_mediumship", // Precipitation (Letters)
            "practice_intellectual_study",
            "practice_communal_gathering", // Wesak Festival
        ],
        startDate: 1875,
        endDate: null,
        inspiredBy: ["Eliphas_Levi_Circle"],
    },

    Anthroposophy: {
        tags: [
            "location_europe", // Germany/Switzerland
            "era_modern", // 1912
            "belief_esotericism", // Spiritual Science
            "belief_gnosis", // Akashic Records
            "practice_dance", // Eurythmy
            "practice_agriculture", // Biodynamics
            "practice_intellectual_aesthetic",
            "belief_christianity", // Esoteric Christianity
        ],
        startDate: 1912,
        endDate: null,
        inspiredBy: ["Theosophical_Society"],
    },

    The_Arcane_School: {
        tags: [
            "location_north_america", // USA
            "era_modern", // 1923
            "belief_new_age", // The Plan/Maitreya
            "belief_cosmology", // Seven Rays
            "practice_meditation", // Full Moon Meditation
            "practice_mantra", // The Great Invocation
            "practice_intellectual_aesthetic",
        ],
        startDate: 1923,
        endDate: null,
        inspiredBy: ["Theosophical_Society"],
    },

    Argentium_Astrum: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1907
            "belief_thelema", // Scientific Illuminism
            "practice_initiation", // The Ordeals
            "practice_ceremonial_magic", // Star Ruby/Sapphire
            "practice_asceticism", // Individual isolation
            "practice_intellectual_aesthetic",
        ],
        startDate: 1907,
        endDate: null,
        inspiredBy: ["Hermetic_Order_of_the_Golden_Dawn", "Eliphas_Levi_Circle"],
    },

    Typhonian_Order: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1970s
            "belief_thelema", // Draconian Tradition
            "belief_lovecraftian", // Cthulhu Mythos
            "practice_sex_magic", // Kalas (Fluids)
            "practice_katabasis", // Daath Entry/Qliphoth
            "practice_macabre_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1970,
        endDate: null,
        inspiredBy: ["Ordo_Templi_Orientis_OTO", "Eliphas_Levi_Circle"],
    },

    Svenska_Satanistkyrkan: {
        tags: [
            "location_europe", // Sweden
            "era_modern", // 1996
            "belief_satanism", // Self Evolvement
            "practice_intellectual_study",
            "practice_eclectic",
        ],
        startDate: 1996,
        endDate: null,
        inspiredBy: [],
    },

    Yggdrasil_Guild: {
        tags: [
            "location_europe", // Sweden
            "era_modern", // 1970s
            "belief_shamanism", // Nordic Shamanism
            "belief_runes", // Uthark Theory
            "practice_altered_state", // Sejd
            "practice_meditation", // Utesittning (Nature sitting)
            "belief_pagan",
        ],
        startDate: 1975,
        endDate: 1994,
        inspiredBy: [],
    },

    Sveriges_Asatrosamfund: {
        tags: [
            "location_europe", // Sweden
            "era_modern", // 1994
            "belief_pagan", // Polytheism
            "belief_humanism", // Non-racist Heathenry
            "practice_offering", // Blot
            "practice_democracy", // Thing assembly
        ],
        startDate: 1994,
        endDate: null,
        inspiredBy: [],
    },

    Morag_Tong: {
        tags: [
            "location_fictional", // Morrowind
            "era_fictional",
            "belief_honor_code", // Sanctioned Murder
            "practice_violence", // Honorable Writ
            "practice_worship", // Mephala/Webspinner
            "practice_martial_aesthetics",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Clockwork_Apostles: {
        tags: [
            "location_fictional", // Clockwork City
            "era_fictional",
            "belief_transhumanism", // Refactoring
            "belief_rationalism", // Truth in Sequence
            "practice_body_modification", // Prosthetics
            "practice_intellectual_aesthetic",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Adeptus_Mechanicus: {
        tags: [
            "location_fictional", // Mars/40k
            "era_fictional",
            "belief_transhumanism", // Flesh is Weak
            "belief_techno_animism", // Machine Spirit
            "practice_body_modification", // Electrografting
            "practice_worship", // Rite of Ignition
            "practice_scifi_aesthetics",
            "practice_macabre_aesthetic",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Bene_Gesserit: {
        tags: [
            "location_fictional", // Dune Universe
            "era_fictional",
            "belief_eugenics", // Golden Path/Genetic manipulation
            "practice_self_control", // Prana Bindu
            "practice_initiation", // Gom Jabbar/Spice Agony
            "practice_manipulation", // The Voice
            "practice_intellectual_aesthetic",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Unitology: {
        tags: [
            "location_fictional", // Dead Space
            "era_fictional",
            "belief_hive_mind", // Convergence
            "practice_body_modification", // Inscriptions
            "practice_ritual_death", // Preservation of Vessel
            "practice_chant", // Make us Whole
            "practice_macabre_aesthetic",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    The_Sith_Order: {
        tags: [
            "location_fictional", // Star Wars
            "era_fictional",
            "belief_power", // Passion/Strength
            "belief_elitism", // Rule of Two
            "practice_violence", // Bleeding Crystal/Sacrifice
            "practice_sorcery", // Alchemy
            "practice_martial_aesthetics",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Nerevarine_Cult: {
        tags: [
            "location_fictional", // Morrowind
            "era_fictional",
            "belief_messianism", // Nerevarine Prophecy
            "practice_initiation", // Ring Test
            "practice_divination", // Reading Apographa
            "practice_shamanism", // Cavern of Incarnate
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Church_of_Selune_and_Shar: {
        tags: [
            "location_fictional", // Forgotten Realms
            "era_fictional",
            "belief_dualism", // Light vs Dark Sisters
            "practice_offering", // Midnight Tear
            "practice_magic", // Shadow Weave
            "practice_subversion", // Infiltration
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Blades_of_the_Darkmoon: {
        tags: [
            "location_fictional", // Dark Souls
            "era_fictional",
            "belief_justice", // Retribution
            "belief_illusion", // Artificial Sun
            "practice_violence", // Blue Eye Orb invasion
            "practice_macabre_aesthetic", // Ear cutting
            "practice_martial_aesthetics",
        ],
        startDate: null,
        endDate: null,
        inspiredBy: [],
    },

    Cofradias_Semana_Santa: {
        tags: [
            "location_europe", // Spain
            "era_medieval", // 15th Century
            "belief_penance", // Anonymity
            "practice_procession", // Carrying Pasos
            "practice_ritual_clothing", // Capirote (Hoods)
            "practice_silence",
            "practice_macabre_aesthetic",
            "belief_christianity",
        ],
        startDate: 1400,
        endDate: null,
        inspiredBy: [],
    },

    Lewes_Bonfire_Societies: {
        tags: [
            "location_europe", // UK
            "era_preindustrial", // 16th Century
            "belief_protestantism", // No Popery
            "practice_fire_ritual", // Burning Effigies/Crosses
            "practice_procession", // Smuggler costumes
            "practice_theatricality",
            "belief_christianity",
        ],
        startDate: 1550,
        endDate: null,
        inspiredBy: [],
    },

    Kukeri_Mummers: {
        tags: [
            "location_europe", // Bulgaria
            "era_preindustrial", // Ancient
            "belief_animism", // Scaring evil
            "belief_fertility",
            "practice_ritual_clothing", // Bells and Furs
            "practice_dance", // Rhythmic jumping
            "practice_ecstatic_aesthetic",
            "belief_pagan",
        ],
        startDate: -500,
        endDate: null,
        inspiredBy: [],
    },

    Krampus_and_Perchten: {
        tags: [
            "location_europe", // Austria/Bavaria
            "era_preindustrial", // Ancient
            "belief_dualism", // Justice (Punishment)
            "belief_animism", // Driving out winter
            "practice_ritual_clothing", // Masks/Furs
            "practice_violence", // Whipping (Ruten)
            "practice_procession", // Krampuslauf
            "practice_macabre_aesthetic",
            "belief_pagan",
        ],
        startDate: -500,
        endDate: null,
        inspiredBy: [],
    },

    Cult_of_Svetovid_Arkona: {
        tags: [
            "location_europe", // Baltic/Slavic
            "era_medieval", // 9th-12th Century
            "belief_polytheism", // Four-faced god
            "practice_divination", // Horn of Plenty/Horse Oracle
            "practice_purity_ritual", // Sacred Breath
            "practice_martial_aesthetics", // 300 Knights
            "belief_pagan",
        ],
        startDate: 800,
        endDate: 1168,
        inspiredBy: [],
    },

    The_Jomsvikings: {
        tags: [
            "location_europe", // Baltic
            "era_medieval", // 10th Century
            "belief_warrior_code", // Valhalla/No fear
            "practice_violence", // Mercenary work
            "practice_ritual_death", // Execution Game
            "practice_asceticism", // Exclusion of women
            "practice_martial_aesthetics",
            "belief_pagan",
        ],
        startDate: 950,
        endDate: 1043,
        inspiredBy: [],
    },

    The_Skoptsy: {
        tags: [
            "location_europe", // Russia
            "era_preindustrial", // 18th Century
            "belief_purity", // Fire Baptism
            "belief_dualism", // Spirit vs Flesh
            "practice_body_modification", // Castration/Mastectomy
            "practice_dance", // Radeniye
            "practice_ritual_clothing", // White garments
            "belief_christianity",
        ],
        startDate: 1750,
        endDate: 1950,
        inspiredBy: ["The_Khlysty"],
    },

    Zurvanism: {
        tags: [
            "location_middle_east", // Persia
            "era_ancient", // 3rd Century
            "belief_fatalism", // Infinite Time (Zurvan)
            "belief_dualism", // Twin brothers (Good/Evil)
            "practice_astrology", // Treaty of Time
            "practice_intellectual_aesthetic",
            "belief_syncretism",
        ],
        startDate: 224,
        endDate: 650,
        inspiredBy: ["The_Magi"],
    },

    The_Vehmic_Courts_Holy_Vehm: {
        tags: [
            "location_europe", // Germany (Westphalia)
            "era_medieval", // 12th Century
            "belief_justice", // Imperial Mandate
            "practice_secrecy", // Secret passwords
            "practice_violence", // Tree Execution
            "practice_ritual_drama", // The Secret Eight
            "practice_macabre_aesthetic",
        ],
        startDate: 1200,
        endDate: 1600,
        inspiredBy: [],
    },

    Komuso_Fuke_Zen: {
        tags: [
            "location_asia", // Japan
            "era_preindustrial", // Edo Period
            "belief_zen", // Blowing Zen (Suizen)
            "belief_emptiness", // Loss of ego
            "practice_music", // Shakuhachi flute
            "practice_ritual_clothing", // Basket hats (Tengai)
            "practice_anonymity",
            "practice_espionage",
        ],
        startDate: 1600,
        endDate: 1871,
        inspiredBy: [],
    },

    The_Process_Church_of_the_Final_Judgment: {
        tags: [
            "location_europe", // London/USA
            "era_modern", // 1966
            "belief_syncretism", // Christ and Satan unity
            "belief_apocalypse", // Final Judgment
            "practice_meditation", // Midnight Meditation
            "practice_mediumship", // Telepathy with dogs
            "practice_macabre_aesthetic", // Black uniforms/capes
        ],
        startDate: 1966,
        endDate: 1974,
        inspiredBy: ["Scientology"],
    },

    Cult_of_Santa_Muerte: {
        tags: [
            "location_north_america", // Mexico
            "era_modern", // Modern
            "belief_syncretism", // Folk Catholicism/Death worship
            "belief_amoralism", // Protection for all
            "practice_offering", // Smoke/Alcohol/Bullets
            "practice_vow", // The Promise (Manda)
            "practice_macabre_aesthetic",
        ],
        startDate: 1960,
        endDate: null,
        inspiredBy: [],
    },

    The_Vestal_Virgins: {
        tags: [
            "location_europe", // Rome
            "era_ancient", // Ancient
            "belief_pagan", // Pax Deorum
            "practice_fire_worship", // Eternal Fire
            "practice_chastity", // Virginity vow
            "practice_ritual_death", // Buried alive punishment
            "practice_offering", // Mola Salsa
        ],
        startDate: -700,
        endDate: 394,
        inspiredBy: [],
    },

    Sol_Niger_Alchemical: {
        tags: [
            "location_europe", // Europe
            "era_medieval", // Medieval
            "belief_alchemy", // Nigredo/Black Sun
            "belief_shadow_work", // Mortificatio
            "practice_visualization", // Skeleton/Putrefaction
            "practice_meditation", // Distillation of emotion
            "practice_macabre_aesthetic",
        ],
        startDate: 1400,
        endDate: 1700,
        inspiredBy: [],
    },

    The_Black_Sun_Press: {
        tags: [
            "location_europe", // Paris
            "era_modern", // 1920s
            "belief_nihilism", // Sun Death
            "belief_art", // Literary aesthetic
            "practice_ritual_suicide", // Suicide Pact
            "practice_writing", // Diaries/Publishing
            "practice_intellectual_aesthetic",
        ],
        startDate: 1927,
        endDate: 1929,
        inspiredBy: [],
    },

    Taoist_Internal_Alchemy: {
        tags: [
            "location_asia", // China
            "era_ancient", // Ancient
            "belief_taoism", // Darkness within Darkness
            "belief_alchemy", // Spiritual Embryo
            "practice_meditation", // Circulation of Light
            "practice_breathwork", // Inversion of Flow
            "practice_visualization", // Inner Vision
            "practice_intellectual_aesthetic",
        ],
        startDate: -200,
        endDate: null,
        inspiredBy: [],
    },

    Sufi_Mystics_of_Black_Light: {
        tags: [
            "location_middle_east", // Iran
            "era_medieval", // Medieval
            "belief_mysticism", // Black Light (Noor-e-siyah)
            "belief_antinomianism", // Ama Lilith/Void
            "practice_meditation", // Dazzling Dark
            "practice_sex_magic", // Opening the Womb
            "practice_asceticism", // Negative Theology
            "belief_muslim",
        ],
        startDate: 1200,
        endDate: null,
        inspiredBy: [],
    },

    Vril_Society: {
        tags: [
            "location_europe", // Germany
            "era_modern", // 20th Century
            "belief_esotericism", // Vril Energy
            "belief_science_fiction", // Subterranean Supermen
            "practice_mediumship", // Telepathy/Channeling
            "practice_technomancy", // Disc blueprints
            "practice_ritual_clothing", // Long hair (Antenna)
        ],
        startDate: 1919,
        endDate: 1945,
        inspiredBy: ["Theosophical_Society"],
    },

    Odinic_Rite: {
        tags: [
            "location_europe", // UK
            "era_modern", // 1973
            "belief_pagan", // Folkishness/Wyrd
            "belief_ancestral_wisdom", // Metagenetics
            "practice_offering", // Blot
            "practice_ritual_drinking", // Sumbel
            "practice_oath", // Oath Ring
            "practice_martial_aesthetics",
        ],
        startDate: 1973,
        endDate: null,
        inspiredBy: [],
    },

    Armanen_Order_List_Society: {
        tags: [
            "location_europe", // Austria
            "era_modern", // 1908
            "belief_ariosophy", // Armanism
            "belief_pagan", // Gnostic Wotanism
            "practice_pilgrimage", // Landscape Mysticism
            "practice_secrecy", // Secret names
            "practice_divination", // Heraldry reading
            "practice_intellectual_aesthetic",
        ],
        startDate: 1908,
        endDate: null,
        inspiredBy: [],
    },

    The_Order_Bruder_Schweigen: {
        tags: [
            "location_north_america", // USA (Pacific Northwest)
            "era_modern", // 1983
            "belief_white_supremacy", // Revolutionary Racism
            "belief_antisemitism", // Anti-ZOG
            "practice_violence", // Domestic terrorism/Assassination
            "practice_crime", // Armored car heists/Counterfeiting
            "practice_oath", // Oath on the green graves
            "practice_paramilitary", // Silent Brotherhood cells
        ],
        startDate: 1983,
        endDate: 1984,
        inspiredBy: ["Christian_Identity", "Aryan_Nations"],
    },

    The_Mortuary_Cult_of_Ancient_Egypt: {
        tags: [
            "location_middle_east", // Egypt
            "era_ancient", // Ancient
            "belief_afterlife", // Field of Reeds
            "belief_magic", // Heka (Words of Power)
            "belief_polytheism",
            "practice_funerary", // Mummification/Opening of the Mouth
            "practice_divination", // Weighing of the Heart
            "practice_chant", // Recitation of Spells
            "practice_symbolism", // Amulets/Ushabti
            "practice_ritual_drama", // Negative Confession
        ],
        startDate: -2600,
        endDate: 395,
        inspiredBy: [],
    },

    The_Atenist_Heresy: {
        tags: [
            "location_middle_east", // Egypt (Amarna)
            "era_ancient", // 1353 BCE
            "belief_monotheism", // The Aten (Sun Disc)
            "belief_humanism", // Living in Truth (Artistic Realism)
            "practice_iconoclasm", // Destroying names of Amun
            "practice_worship", // Open-air temples
            "practice_chant", // Great Hymn to the Aten
            "practice_politics", // Theocracy
        ],
        startDate: -1353,
        endDate: -1336,
        inspiredBy: ["Mitanni_Indo_Aryan_Cult"],
    },

    Eliphas_Levi_Circle: {
        tags: [
            "location_europe", // Paris/London
            "era_industrial", // 1850s
            "belief_hermeticism", // The synthesis of Tarot/Kabbalah
            "belief_christian_esotericism", // He remained a catholic deacon at heart
            "practice_ceremonial_magic", // Evocation of Apollonius
            "practice_symbolism", // Baphomet/Pentagram usage
            "practice_divination", // Tarot
            "practice_intellectual_study", // Magic as Science
            "practice_willpower", // The Human Will as the ultimate force
        ],
        startDate: 1854, // Publication of Dogme et Rituel
        endDate: 1875, // His death (and Crowley's birth)
        inspiredBy: ["The_Magi", "The_Templars", "Christian_Gnosticism"],
    },

    Mitanni_Indo_Aryan_Cult: {
        tags: [
            "location_middle_east", // Northern Syria/Anatolia
            "era_ancient", // c. 1500 BCE
            "belief_polytheism", // Mitra, Varuna, Indra, Nasatya
            "belief_oath_keeping", // Mitra as god of contracts/treaties
            "belief_solar_worship", // Solar aspects of Mitra/Surya
            "belief_cosmic_order", // Rta (precursor to Zoroastrian Asha)
            "practice_sacrifice", // Horse sacrifice (Ashvamedha parallels)
            "practice_chariot_warfare", // Maryannu warrior caste rituals
            "practice_treaty_making", // Invoking gods as witnesses
            "practice_chant", // Recitation of divine names
            "practice_martial_aesthetics",
        ],
        startDate: -1500,
        endDate: -1260,
        inspiredBy: [],
    },

    Minoan_Epiphany_Cult: {
        tags: [
            "location_europe", // Crete, Thera
            "era_ancient", // c. 2000–1450 BCE
            "belief_immanence", // Gods are summoned into the body (Epiphany)
            "belief_animism", // Baetyls (Sacred Stones) and Tree worship
            "belief_matriarchy", // Primacy of the Priestess/Potnia
            "belief_chthonic", // Earth-centric (Earthquakes/Caves)
            "practice_entheogen", // Opium (Poppy Goddess)
            "practice_altered_state", // Epiphanic trance
            "practice_ritual_drama", // Bull Leaping (Taurokathapsia)
            "practice_sacrifice", // Votive limbs (Peak Sanctuaries)
            "practice_symbolism", // The Labrys (Double Axe)
            "practice_ecstatic_aesthetic",
            "practice_martial_aesthetics", // Stylized acrobatics vs nature
            "belief_pagan",
        ],
        startDate: -2000,
        endDate: -1450,
        inspiredBy: ["Anatolian_Mother_Cults"], // Likely connection to early Cybele/Hittite
    },

    Phoenician_High_Cult: {
        tags: [
            "location_middle_east", // Tyre, Sidon, Byblos
            "location_africa", // Carthage
            "location_europe", // Cadiz, Spain
            "era_ancient", // c. 1200–146 BCE
            "belief_polytheism", // Melqart, Astarte, Baal-Hammon
            "belief_sacred_fire", // The undying fire of Melqart
            "belief_transactionalism", // Gods as partners in contract/trade
            "practice_sacred_prostitution", // Qadishtu (Civic duty sex)
            "practice_commerce", // Temples as Central Banks
            "practice_colonization", // Transporting the "Mother Fire" to colonies
            "practice_purity_ritual", // Clean-shaven priests/Linen robes
            "practice_sacrifice", // Tophet (Child sacrifice - Molk)
            "practice_corporate_aesthetic", // The Merchant-Priest
            "belief_pagan",
        ],
        startDate: -1200,
        endDate: -146,
        inspiredBy: ["Cult_of_Baal_Ugarit", "Cult_of_Ishtar_Inanna"],
    },

    Cult_of_Baal_Ugarit: {
        tags: [
            "location_middle_east", // Ancient Syria (Ras Shamra)
            "era_ancient", // 1500–1200 BCE
            "belief_polytheism",
            "belief_cosmic_combat", // Constant war against Chaos (Yam) and Death (Mot)
            "belief_cyclic_time", // Seasonal death and resurrection of the god
            "belief_ancestor_worship", // The Rephaim
            "practice_necromancy", // Feeding the dead (Marzeah)
            "practice_intoxication", // Ritual drunkenness to thin the veil
            "practice_self_mutilation", // Gashing skin during lamentation
            "practice_lamentation", // Ritual weeping for the dead god
            "practice_sacrifice",
            "practice_martial_aesthetics", // Anat's war aspect
            "practice_ritual_drama",
            "belief_pagan",
        ],
        startDate: -1500,
        endDate: -1200,
        inspiredBy: ["Cult_of_Ishtar_Inanna"], // Heavy Sumerian/Semitic influence
    },

    Cult_of_Marduk_Babylon: {
        tags: [
            "location_middle_east", // Babylon
            "era_ancient", // 18th C. BCE – 1st C. BCE
            "belief_polytheism",
            "belief_cosmic_order", // Imposing order on Tiamat (Chaos)
            "belief_divine_kingship", // King as steward of Bel
            "belief_determinism", // The Tablets of Destiny
            "practice_astrology", // The "Script of Heaven"
            "practice_divination", // Reading the will of the gods
            "practice_ritual_drama", // Akitu Festival re-enactments
            "practice_purification", // Scapegoat rites
            "practice_humiliation", // Ritual slapping of the King
            "practice_procession", // Statue transport via ships
            "practice_imperial_aesthetic",
            "belief_pagan",
        ],
        startDate: -1792, // Approximate rise of Hammurabi
        endDate: -100, // Decline of the Esagila
        inspiredBy: ["Cult_of_Ishtar_Inanna"], // Absorbed Sumerian pantheon
    },

    Second_Temple_Order: {
        tags: [
            "location_middle_east", // Jerusalem, Judea
            "era_ancient", // 516 BCE – 70 CE
            "belief_monotheism",
            "belief_holiness_of_time", // Sabbath/Festivals over Idols
            "belief_aniconism", // Ban on images/statues
            "practice_sacrifice", // The Tamid/Mussaf
            "practice_liturgy", // Ma'amadot (Reading as Ritual)
            "practice_fasting", // Lay representatives fasted Mon-Thurs
            "practice_purification", // Mikveh immersion
            "practice_centralization", // One Temple only
            "practice_bureaucracy", // The 24 Courses (Mishmarot)
            "structure_hierocracy", // Priestly Rule
        ],
        startDate: -516,
        endDate: 70,
        inspiredBy: ["Zoroastrian_Dualism", "Cult_of_Baal_Ugarit"], // Influences from Exile & Canaanite roots
    },

    Essenes_Qumran_Sect: {
        tags: [
            "location_middle_east", // Judean Desert
            "era_ancient", // 150 BCE – 68 CE
            "belief_dualism", // Light vs Darkness
            "belief_determinism", // Predestination
            "belief_messianism",
            "belief_purity", // Super-purity laws
            "practice_asceticism", // Desert life
            "practice_purification", // Daily Mikveh
        ],
        startDate: -150,
        endDate: 68,
        inspiredBy: ["Zoroastrian_Dualism"], // Likely influence on their Light/Dark theology
    },

    The_Nazarenes_Jewish_Christians: {
        tags: [
            "location_middle_east", // Jerusalem
            "era_ancient", // 30 CE – 400 CE
            "belief_monotheism",
            "practice_poverty", // Ebionism
        ],
        startDate: 30,
        endDate: 400,
        inspiredBy: ["Essenes_Qumran_Sect", "Second_Temple_Order"],
    },

    Pauline_Christianity: {
        tags: [
            "location_europe", // Rome, Greece
            "era_ancient", // 50 CE – Present
            "belief_mysticism", // Union with Christ
        ],
        startDate: 50,
        endDate: 2024,
        inspiredBy: ["The_Nazarenes_Jewish_Christians", "Mithraic_Mysteries"], // Influenced by Mystery Cults?
    },

    The_Great_White_Brotherhood_Omraam: {
        tags: [
            "location_europe", // France (Bonfin Center)
            "era_modern", // 1937
            "belief_syncretism", // Solar Christianity/Esotericism
            "belief_universalism", // Pan-humanism/Citizen of the Cosmos
            "belief_ascended_masters", // The Great White Lodge
            "practice_solar_worship", // Surya Yoga (Sunrise gazing)
            "practice_meditation", // Laser meditation
            "practice_dance", // Paneurhythmy (Sacred circle dance)
            "practice_communal_living", // Brotherhood centers
            "practice_dietary_restriction", // Vegetarianism/Nutrition as Yoga
            "practice_chant", // Mystic songs of Peter Deunov
            "practice_prayer",
            "practice_ecstatic_aesthetic",
            "belief_christianity", // Esoteric Christianity
        ],
        startDate: 1937,
        endDate: null,
        inspiredBy: ["Bogomils", "Theosophical_Society"],
    },

    Daoist_Bedchamber_Arts_Fangzhong_Shu: {
        tags: [
            "location_asia", // China
            "era_ancient", // c. 200 BCE (Mawangdui Texts)
            "belief_taoism", // Harmony of Yin and Yang
            "belief_vitalism", // Jing (Essence) conservation
            "belief_alchemy", // Internal Alchemy (Neidan)
            "practice_sex_magic", // Coitus Reservatus/Huanjing Bunao (Return Essence to Brain)
            "practice_sex", // Sexual cultivation
            "practice_breathwork", // Qi circulation during intercourse
            "practice_health", // Yangsheng (Nourishing Life)
            "practice_dietary_restriction", // Often paired with dietary regimes
            "practice_taboobreaking", // Often suppressed by Confucian morality
            "practice_carnal_aesthetic",
        ],
        startDate: -200,
        endDate: null,
        inspiredBy: ["Taoist_Internal_Alchemy"],
    },

    Brotherhood_of_the_White_Temple: {
        tags: [
            "location_north_america", // Colorado (Shamballa Ashrama)
            "era_modern", // Founded c. 1930
            "belief_ascended_masters", // Contact with Masters (e.g., Kut Humi)
            "practice_communal_living", // The Shamballa Ashrama community
            "practice_survivalism", // Built concrete bunkers for nuclear war
            "practice_dietary_restriction", // Strict vegetarianism often encouraged
        ],
        startDate: 1930,
        endDate: null,
        inspiredBy: ["Theosophical_Society", "Martinist_Order"],
    },

    Priory_of_Sion: {
        tags: [
            "location_europe", // France (Annemasse/Rennes-le-Château)
            "era_modern", // Registered 1956 (Claimed Ancient 1099)
            "belief_gnosis", // Johannite Christianity / Anti-Vatican
            "belief_sacred_feminine", // Mary Magdalene as the Holy Grail
            "practice_cryptography", // Encoding secrets in art/maps (Poussin)
            "practice_ritual_drama", // "Cutting of the Elm"
            "practice_genealogy", // Fabrication of lineage documents
            "practice_pilgrimage", // Sacred sites in the Languedoc
            "belief_conspiracy", // Shadow government controlling history
        ],
        startDate: 1956,
        endDate: null,
        inspiredBy: ["Knights_Templar_Historical", "Societas_Rosicruciana_in_Anglia", "Cathars_Albigensians", "Freemasonry"],
    },

    I_AM_Activity: {
        tags: [
            "location_north_america", // Chicago / Mt. Shasta
            "era_modern", // 1930s - Present
            "belief_ascended_masters", // Saint Germain, Jesus, Mighty Victory
            "belief_nationalism", // America as the Divine Cup
            "practice_chant", // High-speed "Decrees"
            "practice_visualization", // The Chart of the Presence / Tube of Light
            "practice_dietary_restriction", // Vegetarian / No alcohol / No garlic
        ],
        startDate: 1930,
        endDate: null,
        inspiredBy: ["Theosophical_Society"],
    },

    Enochian_Angelic_Magic: {
        tags: [
            "location_europe", // England (Mortlake)
            "era_preindustrial", // Late 16th Century (1580s)
            "belief_christianity", // Framework of biblical angels
            "belief_gnosis", // Divine knowledge via scrying
            "belief_cosmology", // The Watchtowers and 30 Aethyrs
            "belief_sacred_feminine", // Daughter of Fortitude
            "practice_divination", // Crystal gazing/Scrying
            "practice_ceremonial_magic", // The Holy Table and Sigils
            "practice_chant", // Recitation of the 48 Calls
            "practice_transgression", // The "Cross-Matching" (Wife Swapping)
            "practice_sex_magic", // Proto-sexual eucharist
            "practice_sex", // Actual sexual acts involved
            "practice_intellectual_aesthetic", // Complex mathematical language
        ],
        startDate: 1581,
        endDate: 1608,
        inspiredBy: [],
    },

    Thelema: {
        tags: [
            "location_middle_east", // Cairo origin
            "era_modern", // 1904
            "belief_thelema", // True Will
            "belief_gnosis", // Solar Phallicism
            "belief_apotheosis", // Knowledge and Conversation of HGA
            "practice_ceremonial_magic", // Star Ruby/Liber Resh
            "practice_sex_magic", // Eucharistic theory
            "practice_yoga", // Eight Limbs (modified by Crowley)
            "practice_mantra", // Vibration of Names
            "practice_solar_worship", // Liber Resh
            "practice_intellectual_aesthetic",
            "practice_carnal_aesthetic",
            "belief_syncretism",
        ],
        startDate: 1904,
        endDate: null,
        inspiredBy: [
            "Hermetic_Order_of_the_Golden_Dawn",
            "The_Atenist_Heresy", // Egyptian roots
            "Vamachara_Tantra", // Left-Hand Path sexual theory
            "Taoism", // Crowley's interpretation of Tao as 'The Way/Will'
        ],
    },
}
