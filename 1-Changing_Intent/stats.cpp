#include "stats.h"

#include <algorithm>
#include <cmath>
#include <vector>

void Statistics::add(double value)
{
    samples.push_back(value);
}

std::optional<double> Statistics::getMean() const
{
    if (samples.empty())
        return std::nullopt;

    double sum = 0;
    for (double sample : samples)
        sum += sample;
    return sum / samples.size();
}

std::optional<double> Statistics::getStandardDeviation() const
{
    std::optional<double> mean = getMean();
    if (!mean)
        return std::nullopt;

    double sum = 0;
    for (double sample : samples)
    {
        sum += (sample - *mean) * (sample - *mean);
    }
    return std::sqrt(sum / samples.size() - 1);
}

std::optional<double> Statistics::getMin() const
{
    if (samples.empty())
        return std::nullopt;

    double min = samples[0];
    for (double sample : samples)
    {
        if (sample < min)
        {
            min = sample;
        }
    }
    return min;
}

std::optional<double> Statistics::getMax() const
{
    if (samples.empty())
        return std::nullopt;

    double max = samples[0];
    for (double sample : samples)
    {
        if (sample > max)
        {
            max = sample;
        }
    }
    return max;
}

std::optional<double> Statistics::getMedian() const
{
    if (samples.empty())
        return std::nullopt;

    std::vector<double> sorted = samples;
    std::sort(sorted.begin(), sorted.end());

    size_t size = sorted.size();
    if (size % 2 == 0)
    {
        return (sorted[size / 2 - 1] + sorted[size / 2]) / 2.0;
    }
    else
    {
        return sorted[size / 2];
    }
}

std::optional<double> Statistics::getVariance() const
{
    std::optional<double> mean = getMean();
    if (!mean)
        return std::nullopt;

    double sum = 0;
    for (double sample : samples)
    {
        sum += (sample - *mean) * (sample - *mean);
    }
    return sum / samples.size();
}
