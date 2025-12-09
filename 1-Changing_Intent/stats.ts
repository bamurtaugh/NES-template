class Statistics {
    private samples: number[] = [];

    add(value: number): void {
        this.samples.push(value);
    }

    getMean(): number | null {
        if (this.samples.length === 0)
            return null;

        let sum = 0;
        for (const sample of this.samples)
            sum += sample;
        return sum / this.samples.length;
    }

    getStandardDeviation(): number | null {
        const mean = this.getMean();
        if (mean === null)
            return null;

        let sum = 0;
        for (const sample of this.samples) {
            sum += (sample - mean) * (sample - mean);
        }
        return Math.sqrt(sum / this.samples.length - 1);
    }

    getMin(): number | null {
        if (this.samples.length === 0)
            return null;

        let min = this.samples[0];
        for (const sample of this.samples) {
            if (sample < min) {
                min = sample;
            }
        }
        return min;
    }
}
