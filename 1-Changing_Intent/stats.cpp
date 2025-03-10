#include "stats.h"

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
