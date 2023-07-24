import baseJs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

baseJs.extend(localizedFormat);
baseJs.extend(timezone);
baseJs.extend(advancedFormat);
baseJs.extend(utc);

export const dayjs = baseJs;
