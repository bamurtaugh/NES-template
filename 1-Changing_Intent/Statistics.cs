using System;
using System.Collections.Generic;
using System.Linq;

// C# implementation of statistical calculations
// This demonstrates the same intent as stats.cpp but with different syntax and features

namespace MathUtils
{
    public class Statistics
    {
        private readonly List<double> samples;

        public Statistics()
        {
            samples = new List<double>();
        }

        // Add a sample value
        public void Add(double value) 
        {
            samples.Add(value);
        }

        // Add multiple sample values
        public void AddRange(IEnumerable<double> values)
        {
            samples.AddRange(values);
        }

        // Get count of samples
        public int Count => samples.Count;

        // Calculate mean (average)
        public double? GetMean()
        {
            if (samples.Count == 0)
                return null;

            return samples.Average();
        }

        // Calculate standard deviation
        public double? GetStandardDeviation()
        {
            var mean = GetMean();
            if (mean == null || samples.Count <= 1)
                return null;

            var variance = samples.Select(x => Math.Pow(x - mean.Value, 2)).Average();
            return Math.Sqrt(variance);
        }

        // Get minimum value
        public double? GetMin()
        {
            if (samples.Count == 0)
                return null;

            return samples.Min();
        }

        // Get maximum value
        public double? GetMax()
        {
            if (samples.Count == 0)
                return null;

            return samples.Max();
        }

        // Get median value
        public double? GetMedian()
        {
            if (samples.Count == 0)
                return null;

            var sorted = samples.OrderBy(x => x).ToList();
            int middle = sorted.Count / 2;

            if (sorted.Count % 2 == 0)
            {
                return (sorted[middle - 1] + sorted[middle]) / 2.0;
            }
            else
            {
                return sorted[middle];
            }
        }

        // Get range (max - min)
        public double? GetRange()
        {
            var min = GetMin();
            var max = GetMax();
            
            if (min == null || max == null)
                return null;

            return max.Value - min.Value;
        }

        // Clear all samples
        public void Clear()
        {
            samples.Clear();
        }

        // Get all samples as read-only collection
        public IReadOnlyList<double> GetSamples()
        {
            return samples.AsReadOnly();
        }

        // String representation
        public override string ToString()
        {
            if (samples.Count == 0)
                return "Statistics: No samples";

            return $"Statistics: {samples.Count} samples, Mean: {GetMean():F2}, StdDev: {GetStandardDeviation():F2}";
        }
    }

    // Demonstration program
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("=== C# Statistics Example ===");
            
            var stats = new Statistics();
            
            // Add some sample data
            var testData = new double[] { 10.5, 15.2, 8.7, 22.1, 18.9, 12.3, 9.8, 16.4, 14.7, 11.2 };
            stats.AddRange(testData);
            
            Console.WriteLine($"Sample count: {stats.Count}");
            Console.WriteLine($"Mean: {stats.GetMean():F2}");
            Console.WriteLine($"Standard Deviation: {stats.GetStandardDeviation():F2}");
            Console.WriteLine($"Min: {stats.GetMin():F2}");
            Console.WriteLine($"Max: {stats.GetMax():F2}");
            Console.WriteLine($"Median: {stats.GetMedian():F2}");
            Console.WriteLine($"Range: {stats.GetRange():F2}");
            
            Console.WriteLine($"\n{stats}");
            
            // Add more data and show updated statistics
            stats.Add(25.5);
            stats.Add(5.2);
            
            Console.WriteLine($"\nAfter adding more data:");
            Console.WriteLine($"{stats}");
        }
    }
}