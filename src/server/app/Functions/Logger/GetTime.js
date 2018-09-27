const formatTimeUnit = timeUnit => `${String(timeUnit).padStart(2, '0')}`;

export default () => {
    const date = new Date();
    return `${formatTimeUnit(date.getHours())}:${formatTimeUnit(date.getMinutes())}:${formatTimeUnit(date.getSeconds())}`;
}
