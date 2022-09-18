const DateUtils = {
    convertStringHourToMinutes: (hourString: string) => {
        const [hour, minutes] = hourString.split(":").map(Number)
        const minutesAmout = (hour * 60) + minutes

        return minutesAmout
    },

    convertMinutesToHourString: (minutesAmout: number): string => {
        const hour = Math.floor((minutesAmout / 60))
        const minutes = (minutesAmout % 60)

        return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }
}

export default DateUtils