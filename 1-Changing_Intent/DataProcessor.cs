using System;
using System.Collections.Generic;
using System.Linq;

namespace ChangingIntent
{
    public class DataProcessor
    {
        private List<double> data;
        private bool isProcessed;

        public DataProcessor()
        {
            data = new List<double>();
            isProcessed = false;
        }

        public void AddData(double value)
        {
            data.Add(value);
            isProcessed = false;
        }

        public void AddDataRange(IEnumerable<double> values)
        {
            data.AddRange(values);
            isProcessed = false;
        }

        public double CalculateAverage()
        {
            if (data.Count == 0)
                throw new InvalidOperationException("No data available");
                
            return data.Average();
        }

        public double FindMaximum()
        {
            if (data.Count == 0)
                throw new InvalidOperationException("No data available");
                
            return data.Max();
        }

        public double FindMinimum()
        {
            if (data.Count == 0)
                throw new InvalidOperationException("No data available");
                
            return data.Min();
        }

        public List<double> FilterAboveThreshold(double threshold)
        {
            return data.Where(x => x > threshold).ToList();
        }

        public void ProcessData()
        {
            // Sort the data for processing
            data.Sort();
            isProcessed = true;
        }

        public bool IsProcessed => isProcessed;
        public int Count => data.Count;
        public IReadOnlyList<double> Data => data.AsReadOnly();
    }
}