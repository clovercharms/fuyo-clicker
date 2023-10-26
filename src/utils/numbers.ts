// Implementation derived from Cookie Clicker
// https://orteil.dashnet.org/cookieclicker/
// And the Frozen Cookies addon
// https://github.com/Icehawk78/FrozenCookies

/**
 * Generates a formatting function which determines the base and the
 * corresponding notation, and returns the concatenated formatted result.
 * @param notations The notations for every third power.
 * @returns The concatenated formatted result.
 */
function thirdPowerFormatter(notations: string[]) {
    return (val: number) => {
        let base = 0;
        let notationValue = "";

        if (!isFinite(val)) return "Infinity";

        if (val >= 1000000) {
            val /= 1000;

            while (Math.round(val) >= 1000) {
                val /= 1000;
                base++;
            }

            if (base >= notations.length) {
                return "Infinity";
            } else {
                notationValue = notations[base];
            }
        }
        return Math.round(val * 1000) / 1000 + notationValue;
    };
}

// Collection of third power notations.
const notations = [
    "",
    " million",
    " billion",
    " trillion",
    " quadrillion",
    " quintillion",
    " sextillion",
    " septillion",
    " octillion",
    " nonillion",
    " decillion",
    " undecillion",
    " duodecillion",
    " tredecillion",
    " quattuordecillion",
    " quindecillion",
    " sexdecillion",
    " septendecillion",
    " octodecillion",
    " novemdecillion",
    " vigintillion",
    " unvigintillion",
    " duovigintillion",
    " trevigintillion",
    " quattuorvigintillion",
    " quinvigintillion",
    " sexvigintillion",
    " septenvigintillion",
    " octovigintillion",
    " novemvigintillion",
    " trigintillion",
    " untrigintillion",
    " duotrigintillion",
    " tretrigintillion",
    " quattuortrigintillion",
    " quintrigintillion",
    " sextrigintillion",
    " septentrigintillion",
    " octotrigintillion",
    " novemtrigintillion",
];

// Create default formatter for every third power using given notations.
const numberFormatter = thirdPowerFormatter(notations);

/**
 * Formats a number to be easily human readable.
 * @param value The value to format.
 * @returns The formatted number.
 */
export function formatNumber(value: number) {
    const negative = value < 0;
    value = Math.abs(value);
    const output = numberFormatter(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return negative ? "-" + output : output;
}
