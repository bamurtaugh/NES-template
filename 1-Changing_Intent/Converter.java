public class Converter {
    
    public double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0 / 5.0) + 32.0;
    }
    
    public double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32.0) * 5.0 / 9.0;
    }
    
    public double kilometersToMiles(double kilometers) {
        return kilometers * 0.621371;
    }
    
    public double milesToKilometers(double miles) {
        return miles / 0.621371;
    }
    
    public double kilogramsToPounds(double kilograms) {
        return kilograms * 2.20462;
    }
    
    public double poundsToKilograms(double pounds) {
        return pounds / 2.20462;
    }
}
