import React, { useState } from 'react';
import axios from 'axios';
import './WordCount.css';

const WordCount = () => {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(null);
    const [wordFrequency, setWordFrequency] = useState([]);

    // getting lyrics by title and artist
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const fetchLyrics = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/lyrics?artist=${artist}&title=${title}`);
            setText(response.data);
        } catch (error) {
            console.error('Failed to fetch lyrics: ', error);
        }
    };

    // for creating string array, used for creating u4ea word library
    const [stringText, setStringText] = useState('');

    // u4ea word library
    const [unityScore, setUnityScore] = useState(0);
    const positiveUnityWords = ["aware", "alive", "appreciative", "apprehensive", "attentive", "awake", "cognizant", "conscious", "familiar", "informed", "mindful", "receptive", "wise", "acquainted", "alert", "appraised", "apprised", "au courant", "cool", "enlightened", "go-go", "groovy", "grounded", "heedful", "hip", "in the know", "in the picture", "into", "know the score", "know what's what", "know-how", "knowing", "latched on", "on the beam", "on to", "perceptive", "plugged in", "savvy", "sensible", "sentient", "sharp", "tuned-in", "up on", "wise to", "wised up", "with it", "awareness", "self-aware", "open-minded", "approachable", "impartial", "observant", "tolerant", "acceptant", "acceptive", "broad-minded", "interested", "open to suggestions", "perceptive", "persuadable", "swayable", "unbiased", "understanding", "open-mindedly", "open-mindedness", "spiritual", "divine", "metaphysical", "sacred", "devotional", "holy", "intangible", "airy", "asomatous", "discarnate", "disembodied", "ethereal", "extramundane", "ghostly", "immaterial", "incorporeal", "nonmaterial", "nonphysical", "platonic", "pure", "rarefied", "refined", "supernal", "unfleshly", "unphysical", "nonspiritual", "spiritually", "unspiritual", "wise", "astute", "aware", "careful", "educated", "enlightened", "experienced", "informed", "judicious", "knowledgeable", "perceptive", "prudent", "rational", "sagacious", "sane", "sensible", "smart", "thoughtful", "wary", "well-informed", "contemplative", "keen", "knowing", "sage", "sensing", "sharp", "sound", "understanding", "calculating", "clever", "cogitative", "crafty", "cunning", "discerning", "discreet", "erudite", "foresighted", "insightful", "intuitive", "perspicacious", "politic", "reflective", "sapient", "scholarly", "shrewd", "sophic", "tactful", "taught", "witty", "wisely", "wiser", "wisest", "miraculous", "amazing", "astonishing", "astounding", "awesome", "extraordinary", "freakish", "incredible", "inexplicable", "magical", "marvelous", "monstrous", "phenomenal", "spectacular", "strange", "superhuman", "supernatural", "unbelievable", "unreal", "wondrous", "anomalous", "fabulous", "heavy", "numinous", "preternatural", "prodigious", "staggering", "stupefying", "stupendous", "superior", "supermundane", "supranatural", "thaumaturgic", "the utmost", "unaccountable", "unearthly", "unimaginable", "wonderworking", "miraculously", "bliss", "euphoria", "happiness", "joy", "paradise", "beatitude", "blessedness", "cool", "felicity", "gladness", "heaven", "rapture", "empathy", "affinity", "appreciation", "compassion", "insight", "pity", "rapport", "sympathy", "warmth", "communion", "comprehension", "concord", "recognition", "responsiveness", "soul", "being on same wavelength", "being there for someone", "community of interests", "cottoning to", "good vibrations", "hitting it off", "picking up on", "cleansed", "blank", "bright", "clear", "elegant", "fresh", "graceful", "hygienic", "immaculate", "neat", "orderly", "pure", "simple", "spotless", "squeaky clean", "tidy", "unblemished", "washed", "laundered", "shining", "sparkling", "speckless", "stainless", "trim", "vanilla", "delicate", "dirtless", "faultless", "flawless", "neat as a button", "neat as a pin", "sanitary", "snowy", "spick-and-span", "taintless", "unpolluted", "unsmudged", "unsoiled", "unspotted", "unstained", "unsullied", "untarnished", "well-kept", "consciousness", "alertness", "apprehension", "awareness", "recognition", "sensibility", "care", "carefulness", "cognizance", "concern", "heed", "heedfulness", "mindfulness", "realization", "regard", "underconsciousness"];
    const positiveUnityPhrases = ["au courant", "in the know", "in the picture", "know the score", "know what's what", "latched on", "on the beam", "on to", "plugged in", "up on", "wise to", "wised up", "with it", "open to suggestions", "the utmost", "being on same wavelength", "being there for someone", "community of interests", "cottoning to", "good vibrations", "hitting it off", "picking up on", "squeaky clean", "neat as a button", "neat as a pin"];
    const negativeUnityWords = ["cynical", "contemptuous", "derisive", "ironic", "misanthropic", "misanthropical", "mocking", "pessimistic", "sarcastic", "sardonic", "scoffing", "scornful", "skeptical", "sneering", "suspicious", "unbelieving", "wry", "cynically", "materialistic", "greedy", "profane", "secular", "sensual", "temporal", "acquisitive", "banausic", "carnal", "earthly-minded", "earthy", "material", "mundane", "object-oriented", "possessive", "terrestrial", "unspiritual", "nonmaterialistic", "confused", "baffled", "befuddled", "bewildered", "dazed", "disorganized", "distracted", "muddled", "perplexed", "perturbed", "puzzled", "abashed", "addled", "discombobulated", "disconcerted", "flummoxed", "flustered", "gone", "misled", "nonplussed", "stumped", "thrown", "unscrewed", "unzipped", "woolly", "fouled-up", "glassy-eyed", "punch-drunk", "punchy", "screwy", "shook-up", "slaphappy", "unglued"];
    const negativeUnityPhrases = ["at a loss", "at sea", "at sixes and sevens", "come apart", "mixed up", "not with it", "out to lunch", "shot to pieces", "spaced out", "taken aback", "thrown off balance"];

    const [intuitionScore, setIntuitionScore] = useState(0);
    const positiveIntuitionWords = ["imagination", "artistry", "awareness", "fancy", "fantasy", "idea", "image", "imagery", "ingenuity", "insight", "inspiration", "intelligence", "inventiveness", "originality", "resourcefulness", "thought", "vision", "wit", "acuteness", "chimera", "cognition", "conception", "creation", "creativity", "enterprise", "fabrication", "ideality", "illusion", "invention", "notion", "perceptibility", "realization", "sally", "supposition", "thoughtfulness", "unreality", "verve", "visualization", "wittiness", "creative thought", "flight of fancy", "mental agility", "tranquil", "amicable", "balmy", "calm", "easygoing", "gentle", "mild", "pastoral", "placid", "restful", "sedate", "serene", "sober", "stable", "tame", "temperate", "agreeable", "at ease", "at peace", "collected", "comforting", "composed", "cool", "easy", "even", "even-tempered", "halcyon", "hushed", "lenient", "low", "measured", "moderate", "murmuring", "pacific", "paradisiacal", "patient", "pleasing", "poised", "possessed", "reasonable", "sedative", "smooth", "soft", "soothing", "still", "undisturbed", "unexcitable", "unexcited", "unperturbed", "unruffled", "untroubled", "whispering", "tranquilly", "secure", "protected", "defended", "guarded", "sheltered", "shielded", "immune", "impregnable", "out of harm's way", "riskless", "unassailable", "undamaged", "unharmed", "securable", "secured", "securely", "securing", "unsecurely", "integrity", "honesty", "principle", "probity", "purity", "rectitude", "sincerity", "virtue", "candor", "forthrightness", "goodness", "honestness", "honorableness", "incorruptibility", "incorruption", "righteousness", "straightforwardness", "peace", "accord", "friendship", "love", "reconciliation", "truce", "unity", "amity", "armistice", "cessation", "conciliation", "concord", "neutrality", "order", "pacification", "pacifism", "treaty", "unanimity", "union", "composure", "aplomb", "dignity", "equanimity", "equilibrium", "fortitude", "poise", "self-assurance", "self-control", "serenity", "sobriety", "accord", "assurance", "balance", "calm", "contentment", "control", "cool", "coolness", "dispassion", "ease", "evenness", "harmony", "imperturbability", "moderation", "nonchalance", "placidity", "polish", "quiet", "quietude", "repose", "sang-froid", "sedateness", "self-possession", "stability", "tranquility", "cool head", "coolheadedness", "even temper", "inexcitability", "levelheadedness", "peace of mind", "presence of mind", "insight", "acumen", "intuition", "judgment", "observation", "understanding", "vision", "wisdom", "click", "common sense", "comprehension", "discernment", "divination", "drift", "penetration", "perception", "perceptivity", "perspicacity", "sagaciousness", "sagacity", "sapience", "shrewdness", "wavelength", "sageness", "insights"];
    const positiveIntuitionPhrases = ["creative thought", "flight of fancy", "mental agility", "at ease", "at peace", "out of harm's way", "cool head", "even temper", "peace of mind", "presence of mind", "common sense"];
    const negativeIntuitionWords = ["forgetful", "careless", "distracted", "inattentive", "sloppy", "unmindful", "absent", "absent-minded", "abstracted", "airheaded", "amnemonic", "amnesic", "asleep on the job", "bemused", "dreamy", "heedless", "lax", "like an absent-minded professor", "looking out window", "mooning", "moony", "neglectful", "negligent", "nirvanic", "not on the job", "oblivious", "out of it", "out to lunch", "pipe dreaming", "preoccupied", "remiss", "slack", "unwitting", "woolgathering", "forgetfulness", "unforgetful", "closed-minded", "inflexible", "obstinate", "pigheaded", "rigid", "distracted", "disturbed", "panicked", "distressed", "distraught", "frenzied", "distractedly", "undistracted"];
    const negativeIntuitionPhrases = ["asleep on the job", "like an absent-minded professor", "looking out window", "not on the job", "out of it", "out to lunch", "pipe dreaming"];

    const [resolveScore, setResolveScore] = useState(0);
    const positiveResolveWords = ["communicative", "candid", "chatty", "conversational", "demonstrative", "expansive", "talkative", "communicable", "conversable", "effusive", "enlightening", "forthcoming", "frank", "garrulous", "gushing", "loquacious", "open", "outgoing", "unreserved", "voluble", "truthful", "believable", "candid", "correct", "factual", "forthright", "precise", "realistic", "reliable", "sincere", "straightforward", "true", "trustworthy", "exact", "faithful", "frank", "guileless", "ingenuous", "just", "kosher", "legit", "like it is", "literal", "on the level", "on the up and up", "open", "outspoken", "plainspoken", "real", "righteous", "scrupulous", "square", "straight", "true-blue", "truth-telling", "unfeigned", "unreserved", "veracious", "veritable", "truthfully", "truthfulness", "expressive", "articulate", "artistic", "colorful", "dramatic", "eloquent", "energetic", "passionate", "poignant", "striking", "suggestive", "thoughtful", "vivid", "alive", "allusive", "brilliant", "demonstrative", "emphatic", "forcible", "graphic", "indicative", "ingenious", "lively", "masterly", "meaningful", "mobile", "moving", "pathetic", "pictorial", "picturesque", "pointed", "pregnant", "representative", "responsive", "revelatory", "showy", "significant", "silver-tongued", "spirited", "stimulating", "stirring", "strong", "sympathetic", "tender", "touching", "understanding", "warm", "expressiveness", "artistic", "aesthetic", "creative", "decorative", "dramatic", "imaginative", "musical", "cultivated", "cultured", "elegant", "exquisite", "fine", "graceful", "grand", "harmonious", "ideal", "ornamental", "pictorial", "picturesque", "pleasing", "poetic", "refined", "rhythmical", "sensitive", "stimulating", "stylish", "sublime", "tasteful", "artistically", "purpose", "ambition", "aspiration", "desire", "determination", "direction", "function", "goal", "idea", "intent", "objective", "plan", "principle", "project", "reason", "scheme", "scope", "target", "view", "wish", "animus", "bourn", "calculation", "design", "destination", "dream", "drift", "end", "expectation", "hope", "mecca", "mission", "object", "point", "premeditation", "proposal", "proposition", "prospect", "resolve", "will", "big idea", "intendment", "ulterior motive", "whatfor", "where one's headed", "whole idea", "why and wherefore", "whyfor", "purposed", "purposes", "repurpose", "unpurposed", "open", "accessible", "clear", "free", "susceptible", "wide", "agape", "bare", "cleared", "disclosed", "emptied", "expanded", "exposed", "extended", "gaping", "patent", "peeled", "removed", "rent", "revealed", "rolling", "stripped", "unbarred", "unblocked", "unbolted", "unburdened", "uncluttered", "uncovered", "unfolded", "unfurled", "unlocked", "unplugged", "unsealed", "vacated", "yawning", "airy", "ajar", "dehiscent", "expansive", "extensive", "made passable", "naked", "navigable", "passable", "patulous", "ringent", "spacious", "spread-out", "unimpeded", "unobstructed", "unshut", "unstopped", "opened", "opening", "openly", "openness", "of service", "involved", "active", "auxiliary", "conducive", "contributory", "helpful", "helping", "of help", "partly responsible", "serviceable", "subsidiary", "useful", "sophistication", "composure", "elegance", "finesse", "poise", "refinement", "tact", "worldliness", "urbanity", "savoir faire", "savoir vivre", "social grace", "worldly wisdom", "protection", "conservation", "insurance", "preservation", "safeguard", "safety", "security", "shelter", "stability", "aegis", "armament", "armor", "assurance", "barrier", "buffer", "bulwark", "camouflage", "certainty", "charge", "cover", "custody", "defense", "fix", "guard", "invulnerability", "reassurance", "refuge", "safekeeping", "salvation", "screen", "self-defense", "shield", "strength", "surety", "tutelage", "umbrella", "ward", "guarding", "protecting", "wardship"];
    const positiveResolvePhrases = ["like it is", "on the level", "on the up and up", "big idea", "ulterior motive", "where one's headed", "whole idea", "why and wherefore", "made passable", "of service", "of help", "partly responsible", "savoir faire", "savoir vivre", "social grace", "worldly wisdom"];
    const negativeResolveWords = ["out of control", "carried away", "disorderly", "out of hand", "rebellious", "uncontrollable", "ungovernable", "unmanageable", "unruly", "wild"];
    const negativeResolvePhrases = ["out of control", "carried away", "out of hand"];

    const [harmonyScore, setHarmonyScore] = useState(0);
    const positiveHarmonyWords = ["empathic", "compassionate", "empathetic", "feeling", "sensitive", "sympathetic", "compassionate", "benevolent", "charitable", "humane", "merciful", "sympathetic", "warm", "warmhearted", "forbearing", "pitying", "sparing", "tender", "understanding", "all heart", "being big", "bleeding-heart", "commiserative", "going easy on", "humanitarian", "indulgent", "kindhearted", "kindly", "lenient", "living with", "old softie", "piteous", "responsive", "soft-shell", "softhearted", "tenderhearted", "compassionately", "compassionateness", "uncompassionate", "forgiving", "lenient", "magnanimous", "merciful", "accepting", "kind", "positive", "clear", "conclusive", "confident", "decisive", "specific", "absolute", "affirmative", "cold", "concrete", "express", "firm", "perfect", "rank", "real", "actual", "assured", "categorical", "clear-cut", "cocksure", "complete", "consummate", "convinced", "decided", "direct", "downright", "explicit", "factual", "forceful", "forcible", "genuine", "hard", "inarguable", "incontestable", "incontrovertible", "indisputable", "indubitable", "irrefutable", "out-and-out", "outright", "sure", "thorough", "thoroughgoing", "unambiguous", "undeniable", "unequivocal", "unmistakable", "unmitigated", "positiveness", "positives", "loving", "admiring", "affectionate", "amiable", "attentive", "benevolent", "caring", "considerate", "cordial", "dear", "devoted", "doting", "earnest", "faithful", "friendly", "generous", "loyal", "passionate", "romantic", "thoughtful", "warm", "attached", "concerned", "enamored", "infatuated", "liking", "respecting", "tender", "valuing", "amatory", "amorous", "anxious", "appreciative", "ardent", "demonstrative", "erotic", "expressive", "fervent", "fond", "idolatrous", "impassioned", "kind", "reverent", "reverential", "sentimental", "solicitous", "warm-hearted", "worshipful", "zealous", "lovingly", "lovingness", "unloving", "hopeful", "buoyant", "cheerful", "comfortable", "confident", "eager", "enthusiastic", "rosy", "sanguine", "trusting", "upbeat", "calm", "content", "faithful", "high", "anticipating", "anticipative", "assured", "at ease", "blithe", "elated", "emboldened", "expecting", "forward-looking", "hoping", "inspirited", "keeping the faith", "lighthearted", "looking forward to", "reassured", "rose-colored", "satisfied", "serene", "trustful", "unflagging", "hopefulness", "unhopeful", "connection", "contact", "network", "relation", "acquaintance", "agent", "ally", "associate", "association", "friend", "go-between", "intermediary", "kin", "kindred", "kinship", "mentor", "messenger", "reciprocity", "relative", "sponsor", "connectional", "connections", "sincerity", "candor", "earnestness", "frankness", "genuineness", "goodwill", "impartiality", "probity", "reliability", "seriousness", "trustworthiness", "truth", "truthfulness", "veracity", "artlessness", "heart", "honor", "innocence", "justice", "openness", "singleness", "wholeheartedness", "bona fides", "good faith", "guilelessness", "sincereness"];
    const positiveHarmonyPhrases = ["all heart", "being big", "going easy on", "living with", "old softie", "at ease", "keeping the faith", "looking forward to", "bona fides", "good faith"];
    const negativeHarmonyWords = ["anti-social", "antisocial", "egoistic", "egotistical", "eremitic", "hating", "inhumane", "malevolent", "misanthropical", "reclusive", "reserved", "sarcastic", "selfish", "solitary", "standoffish", "unfriendly", "critical", "demanding", "analytical", "belittling", "biting", "calumniatory", "captious", "carping", "caviling", "cavillous", "censorious", "censuring", "choleric", "condemning", "critic", "cutting", "cynical", "demeaning", "derogatory", "diagnostic", "disapproving", "discerning", "discriminating", "disparaging", "exacting", "exceptive", "finicky", "fussy", "hairsplitting", "humbling", "hypercritical", "lowering", "nagging", "niggling", "nit-picking", "overcritical", "particular", "penetrating", "reproachful", "sarcastic", "satirical", "scolding", "severe", "sharp", "trenchant", "withering", "criticality", "critically", "criticalness", "jealous", "anxious", "apprehensive", "attentive", "envious", "intolerant", "possessive", "protective", "resentful", "skeptical", "suspicious", "begrudging", "covetous", "demanding", "doubting", "emulous", "envying", "grabby", "grasping", "green-eyed", "grudging", "guarded", "invidious", "jaundiced", "mistrustful", "monopolizing", "possessory", "questioning", "rival", "solicitous", "vigilant", "watchful", "zealous", "demanding", "ambitious", "critical", "difficult", "exacting", "exhausting", "hard", "onerous", "pressing", "strict", "stringent", "taxing", "tough", "troublesome", "trying", "nagging", "wearing", "backbreaker", "bothersome", "clamorous", "dictatorial", "exigent", "fussy", "grievous", "imperious", "importunate", "insistent", "oppressive", "querulous", "weighty"];
    const negativeHarmonyPhrases = [];

    const [miraclesScore, setMiraclesScore] = useState(0);
    const positiveMiraclesWords = ["confident", "assured", "convinced", "positive", "sure", "upbeat", "hopeful", "optimistic", "sanguine", "counting on", "expectant", "having faith in", "secure", "confidently", "unconfident", "discipline", "control", "development", "education", "method", "practice", "preparation", "regulation", "restraint", "self-control", "self-restraint", "will", "conduct", "cultivation", "curb", "domestication", "drill", "drilling", "exercise", "inculcation", "indoctrination", "limitation", "orderliness", "self-command", "self-government", "strictness", "subordination", "willpower", "self-mastery", "disciplines", "energetic", "active", "aggressive", "dynamic", "enterprising", "industrious", "lively", "powerful", "spirited", "sprightly", "spry", "strong", "tireless", "vigorous", "animated", "ball of fire", "breezy", "brisk", "demoniac", "driving", "forcible", "fresh", "hardy", "high-powered", "indefatigable", "kinetic", "lusty", "peppy", "potent", "red-blooded", "rugged", "snappy", "stalwart", "strenuous", "sturdy", "tough", "unflagging", "untiring", "vital", "vivacious", "zippy", "energetically", "unenergetic", "empower", "allow", "entitle", "entrust", "grant", "legitimize", "permit", "vest", "accredit", "capacitate", "charge", "commission", "delegate", "invest", "license", "okay", "privilege", "qualify", "sanction", "warrant", "empowered", "empowering", "empowerment", "determined", "decisive", "dogged", "purposeful", "resolute", "resolved", "serious", "single-minded", "steadfast", "strong-willed", "stubborn", "tenacious", "bent", "decided", "firm", "fixed", "obstinate", "pat", "persevering", "set", "settled", "bent on", "buckled down", "constant", "earnest", "hard as nails", "hardboiled", "intent", "mean business", "on ice", "set on", "solid", "strong-minded", "unfaltering", "unflinching", "unhesitating", "unwavering", "determinedly", "undetermined", "charismatic", "appealing", "alluring", "hypnotic", "larger than life", "magnetic", "mesmerizing", "poised", "balance", "equity", "harmony", "tension", "antithesis", "correspondence", "counterbalance", "equivalence", "evenness", "hang", "parity", "proportion", "stasis", "symmetry", "even-steven", "balanced", "balancing", "humor", "banter", "farce", "fun", "gag", "joke", "playfulness", "whimsy", "wisecrack", "wit", "amusement", "badinage", "buffoonery", "clowning", "comicality", "drollery", "facetiousness", "flippancy", "gaiety", "happiness", "jest", "jesting", "jocoseness", "jocosity", "jocularity", "joking", "joyfulness", "kidding", "levity", "lightness", "pleasantry", "raillery", "tomfoolery", "witticism", "wittiness", "comicalness", "high spirits", "humored", "humoring", "humorless", "protection", "conservation", "insurance", "preservation", "safeguard", "safety", "security", "shelter", "stability", "aegis", "armament", "armor", "assurance", "barrier", "buffer", "bulwark", "camouflage", "certainty", "charge", "cover", "custody", "defense", "fix", "guard", "invulnerability", "reassurance", "refuge", "safekeeping", "salvation", "screen", "self-defense", "shield", "strength", "surety", "tutelage", "umbrella", "ward", "guarding", "protecting", "wardship"];
    const positiveMiraclesPhrases = ["counting on", "having faith in", "ball of fire", "bent on", "buckled down", "hard as nails", "mean business", "on ice", "set on", "larger than life", "high spirits"];
    const negativeMiraclesWords = ["lethargic", "apathetic", "dull", "lackadaisical", "laid-back", "languid", "listless", "passive", "sleepy", "blah", "comatose", "debilitated", "dilatory", "dopey", "dormant", "draggy", "drowsy", "enervated", "having spring fever", "heavy", "idle", "impassive", "inactive", "indifferent", "inert", "laggard", "languorous", "moony", "nebbish", "out of it", "phlegmatic", "sleepyhead", "slothful", "slow", "slumberous", "snoozy", "somnolent", "spiritless", "stolid", "stretchy", "stupefied", "supine", "torpid", "wimpy", "lethargically", "addicted", "absorbed", "accustomed", "attached", "devoted", "hooked", "inclined", "obsessed", "disposed", "habituated", "hyped", "imbued", "predisposed", "dependent", "fond", "given over to", "given to", "prone to", "spaced out", "strung-out", "under the influence", "used to", "wedded to"];
    const negativeMiraclesPhrases = ["having spring fever", "out of it", "given over to", "given to", "prone to", "spaced out", "under the influence", "used to", "wedded to"];

    const [cleanseScore, setCleanseScore] = useState(0);
    const positiveCleanseWords = ["independent", "autonomous", "nonpartisan", "self-reliant", "self-sufficient", "separate", "sovereign", "absolute", "autarchic", "autarchical", "freewheeling", "individualistic", "nonaligned", "on one's own", "self-contained", "self-determining", "self-governing", "self-ruling", "self-supporting", "separated", "unaided", "unallied", "unconnected", "unconstrained", "uncontrolled", "unregimented", "independently", "independents", "sensual", "exciting", "sensuous", "sexual", "sexy", "tactile", "voluptuous", "x-rated", "animal", "animalistic", "arousing", "bodily", "carnal", "debauched", "delightful", "epicurean", "fleshly", "heavy", "hedonic", "hot", "lascivious", "lecherous", "lewd", "libidinous", "licentious", "lustful", "moving", "pleasing", "rough", "sharpened", "steamy", "stimulating", "stirring", "unchaste", "unspiritual", "adaptable", "compliant", "flexible", "malleable", "resilient", "versatile", "ac-dc", "adjustable", "all around", "alterable", "can-do", "changeable", "conformable", "convertible", "ductile", "easygoing", "hanging loose", "modifiable", "moldable", "plastic", "pliable", "pliant", "supple", "switch-hitting", "tractable", "variable", "adaptability", "unadaptable", "joy", "amusement", "bliss", "charm", "cheer", "comfort", "delight", "elation", "glee", "humor", "pride", "satisfaction", "wonder", "alleviation", "animation", "delectation", "diversion", "ecstasy", "exultation", "exulting", "felicity", "festivity", "frolic", "fruition", "gaiety", "gem", "gladness", "gratification", "hilarity", "indulgence", "jewel", "jubilance", "liveliness", "luxury", "merriment", "mirth", "prize", "rapture", "ravishment", "refreshment", "rejoicing", "revelry", "solace", "sport", "transport", "treasure", "treat", "good humor", "pride and joy", "regalement", "creative", "gifted", "ingenious", "innovative", "inventive", "original", "productive", "prolific", "visionary", "originative", "clever", "cool", "demiurgic", "deviceful", "fertile", "hip", "innovational", "innovatory", "inspired", "leading-edge", "stimulating", "way-out", "creativeness", "uncreative", "courage", "audacity", "bravery", "daring", "determination", "endurance", "fearlessness", "firmness", "fortitude", "gallantry", "grit", "heroism", "prowess", "spirit", "spunk", "tenacity", "valor", "adventurousness", "backbone", "bravura", "dash", "dauntlessness", "enterprise", "gameness", "guts", "hardihood", "intrepidity", "mettle", "nerve", "pluck", "power", "pugnacity", "rashness", "recklessness", "resolution", "stoutheartedness", "temerity", "venturesomeness", "adventuresomeness", "lion-heartedness", "élan", "friendly", "affable", "affectionate", "amiable", "amicable", "attentive", "beneficial", "chummy", "cordial", "familiar", "favorable", "good", "helpful", "loving", "loyal", "neighborly", "peaceful", "receptive", "sympathetic", "welcoming", "close", "faithful", "kind", "sociable", "tender", "thick", "attached", "auspicious", "benevolent", "benign", "buddy-buddy", "civil", "clubby", "comradely", "conciliatory", "confiding", "convivial", "fond", "genial", "kindly", "on good terms", "outgoing", "peaceable", "propitious", "solicitous", "well-disposed", "friendlier", "friendliness", "success", "accomplishment", "achievement", "advance", "benefit", "boom", "fame", "gain", "happiness", "profit", "progress", "prosperity", "realization", "triumph", "victory", "win", "arrival", "ascendancy", "attainment", "clover", "consummation", "eminence", "fortune", "fruition", "hit", "killing", "laugher", "maturation", "reward", "savvy", "sensation", "snap", "strike", "successfulness", "walkaway", "walkover", "bed of roses", "big hit", "do well", "easy street", "flying colors", "good luck", "good times", "grand slam", "gravy train", "happy days", "lap of luxury", "éclat", "nonsuccess", "successes"];
    const positiveCleansePhrases = ["on one's own", "all around", "hanging loose", "good humor", "pride and joy", "on good terms", "bed of roses", "big hit", "do well", "easy street", "flying colors", "good luck", "good times", "grand slam", "gravy train", "happy days", "lap of luxury"];
    const negativeCleanseWords = ["rigid", "adamant", "austere", "definite", "exact", "fixed", "hard-line", "harsh", "inflexible", "intransigent", "rigorous", "solid", "stern", "stringent", "uncompromising", "unyielding", "adamantine", "bullheaded", "changeless", "chiseled", "dead set", "determined", "firm", "hard", "incompliant", "inelastic", "inexorable", "invariable", "locked-in", "obdurate", "set", "single-minded", "static", "strait-laced", "unalterable", "unbending", "unbreakable", "unchanging", "undeviating", "unmoving", "unpermissive", "unrelenting", "rigidity", "rigidly", "rigidness", "sensitive", "conscious", "delicate", "emotional", "hypersensitive", "keen", "nervous", "perceptive", "precise", "receptive", "responsive", "susceptible", "tense", "touchy", "tricky", "unstable", "acute", "feeling", "fine", "knowing", "psychic", "seeing", "understanding", "cognizant", "easily affected", "emotionable", "high-strung", "hung up", "impressible", "irritable", "oversensitive", "perceiving", "precarious", "reactive", "sensatory", "sensile", "sensorial", "sensory", "sentient", "supersensitive", "ticklish", "touchy feely", "tuned-in", "turned on to", "umbrageous", "wired", "sensitively", "ultrasensitive"];
    const negativeCleansePhrases = ["dead set", "set in stone", "easily affected", "hung up", "touchy feely", "turned on to"];

    const [liberateScore, setLiberateScore] = useState(0);
    const positiveLiberateWords = ["patient", "calm", "forgiving", "gentle", "quiet", "tolerant", "long-suffering", "understanding", "accommodating", "composed", "easygoing", "enduring", "even-tempered", "forbearing", "imperturbable", "indulgent", "lenient", "meek", "mild", "mild-tempered", "persevering", "persistent", "philosophic", "philosophical", "resigned", "self-possessed", "serene", "stoical", "submissive", "tranquil", "uncomplaining", "unruffled", "untiring", "patiently", "patientness", "sexual", "carnal", "erotic", "intimate", "passionate", "reproductive", "sensual", "animal", "animalistic", "bestial", "fleshly", "generative", "genital", "genitive", "loving", "procreative", "sharing", "venereal", "voluptuous", "wanton", "stable", "balanced", "calm", "durable", "fast", "lasting", "permanent", "reliable", "safe", "secure", "solid", "steady", "strong", "substantial", "abiding", "anchored", "enduring", "established", "even", "firm", "invariable", "nailed", "poised", "set", "sound", "stabile", "stalwart", "staunch", "stout", "tough", "uniform", "brick-wall", "deep-rooted", "equable", "immutable", "perdurable", "resolute", "solid as a rock", "stationary", "staying put", "steadfast", "sturdy", "sure", "together", "unalterable", "unchangeable", "unfluctuating", "unvarying", "unwavering", "well-built", "well-founded", "stableness", "stably", "grounded", "alive", "appreciative", "apprehensive", "attentive", "awake", "cognizant", "conscious", "familiar", "informed", "mindful", "receptive", "wise", "acquainted", "alert", "appraised", "apprised", "au courant", "cool", "enlightened", "go-go", "groovy", "heedful", "hip", "in the know", "in the picture", "into", "know the score", "know what's what", "know-how", "knowing", "latched on", "on the beam", "on to", "perceptive", "plugged in", "savvy", "sensible", "sentient", "sharp", "tuned-in", "up on", "wise to", "wised up", "with it", "energized", "activated", "alert", "animated", "spirited", "active", "dynamic", "gay", "happy", "vivacious", "instinctive", "impulsive", "ingrained", "inherent", "innate", "intuitive", "natural", "spontaneous", "visceral", "accustomed", "by seat of one's pants", "congenital", "habitual", "inborn", "instinctual", "intrinsic", "intuitional", "involuntary", "knee-jerk", "mechanical", "native", "normal", "regular", "rooted", "second-nature", "typical", "unlearned", "unmeditated", "unpremeditated", "unprompted", "unthinking", "instinctively", "secure", "protected", "defended", "guarded", "sheltered", "shielded", "immune", "impregnable", "out of harm's way", "riskless", "unassailable", "undamaged", "unharmed", "securable", "secured", "securely", "securing", "unsecurely", "passionate", "ardent", "loving", "romantic", "wistful", "amorous", "aroused", "concupiscent", "desirous", "erotic", "heavy", "hot", "lascivious", "libidinous", "lustful", "prurient", "sexy", "steamy", "stimulated", "sultry", "turned-on", "wanton", "passionately"];
    const positiveLiberatePhrases = ["set in stone", "solid as a rock", "staying put", "au courant", "in the know", "in the picture", "know the score", "know what's what", "latched on", "on the beam", "on to", "plugged in", "up on", "wise to", "wised up", "with it", "by seat of one's pants", "out of harm's way"];
    const negativeLiberateWords = ["anxiety", "angst", "apprehension", "concern", "disquiet", "doubt", "dread", "jitters", "misery", "misgiving", "mistrust", "nervousness", "panic", "restlessness", "suffering", "suspense", "trouble", "uncertainty", "unease", "uneasiness", "botheration", "butterflies", "care", "creeps", "disquietude", "distress", "downer", "drag", "fidgets", "flap", "foreboding", "fretfulness", "fuss", "heebie-jeebies", "jumps", "needles", "shakes", "shivers", "solicitude", "sweat", "watchfulness", "willies", "worriment", "all-overs", "ants in pants", "cold sweat", "goose bumps", "nail-biting", "pins and needles", "grief", "agony", "anguish", "bereavement", "despair", "discomfort", "gloom", "heartache", "heartbreak", "melancholy", "misery", "mourning", "pain", "regret", "remorse", "sadness", "sorrow", "trouble", "unhappiness", "woe", "worry", "affliction", "care", "dejection", "depression", "desolation", "despondency", "disquiet", "distress", "dole", "dolor", "grievance", "harassment", "infelicity", "lamentation", "malaise", "mortification", "mournfulness", "purgatory", "rue", "torture", "trial", "tribulation", "vexation", "wretchedness", "bemoaning", "bewailing", "deploring", "lamenting", "repining", "guilt", "culpability", "disgrace", "indiscretion", "liability", "regret", "remorse", "responsibility", "shame", "sin", "stigma", "answerability", "blameworthiness", "contrition", "crime", "criminality", "delinquency", "dereliction", "dishonor", "error", "failing", "fault", "infamy", "iniquity", "lapse", "malfeasance", "malpractice", "misbehavior", "misconduct", "misstep", "offense", "onus", "penitence", "self-condemnation", "self-reproach", "sinfulness", "slip", "solecism", "transgression", "wickedness", "wrong", "malefaction", "peccability", "fear", "alarm", "angst", "anxiety", "apprehension", "awe", "concern", "despair", "dismay", "doubt", "dread", "horror", "jitters", "panic", "scare", "suspicion", "terror", "unease", "uneasiness", "worry", "abhorrence", "agitation", "apprehensiveness", "aversion", "consternation", "cowardice", "creeps", "discomposure", "disquietude", "distress", "faintheartedness", "fearfulness", "foreboding", "fright", "funk", "misgiving", "nightmare", "phobia", "presentiment", "qualm", "reverence", "revulsion", "timidity", "trembling", "trepidation", "bête noire", "chickenheartedness", "cold feet", "cold sweat", "recreancy", "feared", "fearing", "fears", "unfearing"];
    const negativeLiberatePhrases = ["ants in pants", "cold sweat", "goose bumps", "pins and needles", "bête noire", "cold feet", "cold sweat"];

    // for creating phrase libraries
    const filterPhrases = (textArray) => {
        return textArray.filter(item => item.includes(' '));
    };

    const countWords = () => {
        const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}?"=\_`~()]/g, '');
        const words = cleanedText.split(/\s+/).filter(Boolean);

        // for creating string array
        const u4eaText = text.toLowerCase().replace(/[.\/#!$%\^&\*;{}?"=\_`~()]/g, '');
        const u4eaWords = u4eaText.split(/[,|:|\n]/).map(word => word.trim()).filter(Boolean);

        // converting u4ea words to string array form
        const stringWords = u4eaWords.map(word => `"${word}"`);
        setStringText(stringWords.join(", "));

        setWordCount(words.length);

        let frequency = {};
        let unityScore = 0;
        let intuitionScore = 0;
        let resolveScore = 0;
        let harmonyScore = 0;
        let miraclesScore = 0;
        let cleanseScore = 0;
        let liberateScore = 0;

        for (let word of words) {
            if (frequency[word]) {
                frequency[word]++;
            } else {
                frequency[word] = 1;
            }
            if (positiveUnityWords.includes(word)) {
                unityScore++;
            }
            if (negativeUnityWords.includes(word)) {
                unityScore--;
            }
            if (positiveIntuitionWords.includes(word)) {
                intuitionScore++;
            }
            if (negativeIntuitionWords.includes(word)) {
                intuitionScore--;
            }
            if (positiveResolveWords.includes(word)) {
                resolveScore++;
            }
            if (negativeResolveWords.includes(word)) {
                resolveScore--;
            }
            if (positiveHarmonyWords.includes(word)) {
                harmonyScore++;
            }
            if (negativeHarmonyWords.includes(word)) {
                harmonyScore--;
            }
            if (positiveMiraclesWords.includes(word)) {
                miraclesScore++;
            }
            if (negativeMiraclesWords.includes(word)) {
                miraclesScore--;
            }
            if (positiveCleanseWords.includes(word)) {
                cleanseScore++;
            }
            if (negativeCleanseWords.includes(word)) {
                cleanseScore--;
            }
            if (positiveLiberateWords.includes(word)) {
                liberateScore++;
            }
            if (negativeLiberateWords.includes(word)) {
                liberateScore--;
            }
        }

        for (let phrase of [...positiveUnityPhrases, ...negativeUnityPhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveUnityPhrases.includes(phrase)) {
                    unityScore += count;
                }
                if (negativeUnityPhrases.includes(phrase)) {
                    unityScore -= count;
                }
            }
        }

        for (let phrase of [...positiveIntuitionPhrases, ...negativeIntuitionPhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveIntuitionPhrases.includes(phrase)) {
                    intuitionScore += count;
                }
                if (negativeIntuitionPhrases.includes(phrase)) {
                    intuitionScore -= count;
                }
            }
        }

        for (let phrase of [...positiveResolvePhrases, ...negativeResolvePhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveResolvePhrases.includes(phrase)) {
                    resolveScore += count;
                }
                if (negativeResolvePhrases.includes(phrase)) {
                    resolveScore -= count;
                }
            }
        }

        for (let phrase of [...positiveHarmonyPhrases, ...negativeHarmonyPhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveHarmonyPhrases.includes(phrase)) {
                    harmonyScore += count;
                }
                if (negativeHarmonyPhrases.includes(phrase)) {
                    harmonyScore -= count;
                }
            }
        }

        for (let phrase of [...positiveMiraclesPhrases, ...negativeMiraclesPhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveMiraclesPhrases.includes(phrase)) {
                    miraclesScore += count;
                }
                if (negativeMiraclesPhrases.includes(phrase)) {
                    miraclesScore -= count;
                }
            }
        }

        for (let phrase of [...positiveCleansePhrases, ...negativeCleansePhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveCleansePhrases.includes(phrase)) {
                    cleanseScore += count;
                }
                if (negativeCleansePhrases.includes(phrase)) {
                    cleanseScore -= count;
                }
            }
        }

        for (let phrase of [...positiveLiberatePhrases, ...negativeLiberatePhrases]) {
            const count = (cleanedText.match(new RegExp(`\\b${phrase}\\b`, "g")) || []).length;
            if (count > 0) {
                frequency[phrase] = count;
                if (positiveLiberatePhrases.includes(phrase)) {
                    liberateScore += count;
                }
                if (negativeLiberatePhrases.includes(phrase)) {
                    liberateScore -= count;
                }
            }
        }

        // displays frequencies of words in decreasing order
        const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        setWordFrequency(sortedFrequency);

        setUnityScore(unityScore);
        setIntuitionScore(intuitionScore);
        setResolveScore(resolveScore);
        setHarmonyScore(harmonyScore);
        setMiraclesScore(miraclesScore);
        setCleanseScore(cleanseScore);
        setLiberateScore(liberateScore);
    };

    return (
        <div className="container">
            <div className="maxContainer">
                <div>
                    <h2 className="title">
                        U4Ea Song Analyzer
                    </h2>
                </div>
                <textarea rows="10" cols="50" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here..."></textarea>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Enter artist name..."/>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title name..."/>
                <button onClick={fetchLyrics}>Fetch Lyrics</button>
                <button onClick={countWords}>Count Words</button>
                <div className="scoreContainer">
                    <div className="scoreHeader">
                        <div className="scoreText">
                            Total Words
                        </div>
                        <div className="m1-4">
                            {wordCount}
                        </div>
                    </div>
                </div>
                <div className="scoreContainer">
                    <div className="scoreHeader">
                        <div className="scoreText">
                            U4Ea Score
                        </div>
                        <div className="m1-4">
                            <p>
                                Unity Score: {unityScore} <br />
                                Intuition Score: {intuitionScore} <br />
                                Resolve Score: {resolveScore} <br />
                                Harmony Score: {harmonyScore} <br />
                                Miracles Score: {miraclesScore} <br />
                                Cleanse Score: {cleanseScore} <br />
                                Liberate Score: {liberateScore}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="wordFrequencyContainer">
                    {wordFrequency.map(([word, count]) => (
                        <p key={word} className="wordFrequency">{word}: {count}</p>
                    ))}
                </div>
            </div>
            {/*original, can help get libraries*/}
            {/*<div>Total Words: {wordCount}</div>*/}
            {/*<div id={"words"}>*/}
            {/*    {wordFrequency.map(([word, count]) => (*/}
            {/*        <p key={word}>{word}: {count}</p>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div id={"score"}>*/}
            {/*    <p>*/}
            {/*    Unity Score: {unityScore} <br />*/}
            {/*    Intuition Score: {intuitionScore} <br />*/}
            {/*    Resolve Score: {resolveScore} <br />*/}
            {/*    Harmony Score: {harmonyScore} <br />*/}
            {/*    Miracles Score: {miraclesScore} <br />*/}
            {/*    Cleanse Score: {cleanseScore} <br />*/}
            {/*    Liberate Score: {liberateScore}*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*<div id={"array"}>*/}
            {/*    [{stringText}];*/}
            {/*</div>*/}
            {/*<div id={"phrases"}>*/}
            {/*    Phrase Library: [{filterPhrases([...negativeLiberateWords]).map(word =>`"${word}"`).join(', ')}];*/}
            {/*</div>*/}
        </div>
    );
};

export default WordCount;
