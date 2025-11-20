import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class MathOperationsTest {
    
    private MathOperations mathOps;
    
    @Before
    public void setUp() {
        mathOps = new MathOperations();
    }
    
    @Test
    public void testFactorialOfZero() {
        assertEquals(1, mathOps.factorial(0));
    }
    
    @Test
    public void testFactorialOfOne() {
        assertEquals(1, mathOps.factorial(1));
    }
    
    @Test
    public void testFactorialOfPositiveNumber() {
        assertEquals(120, mathOps.factorial(5));
        assertEquals(720, mathOps.factorial(6));
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFactorialOfNegativeNumber() {
        mathOps.factorial(-1);
    }
    
    @Test
    public void testFibonacciBaseCase() {
        assertEquals(0, mathOps.fibonacci(0));
        assertEquals(1, mathOps.fibonacci(1));
    }
    
    @Test
    public void testFibonacciSequence() {
        assertEquals(1, mathOps.fibonacci(2));
        assertEquals(2, mathOps.fibonacci(3));
        assertEquals(3, mathOps.fibonacci(4));
        assertEquals(5, mathOps.fibonacci(5));
        assertEquals(8, mathOps.fibonacci(6));
    }
    
    @Test
    public void testIsPrimeForSmallNumbers() {
        assertFalse(mathOps.isPrime(0));
        assertFalse(mathOps.isPrime(1));
        assertTrue(mathOps.isPrime(2));
        assertTrue(mathOps.isPrime(3));
        assertFalse(mathOps.isPrime(4));
    }
    
    @Test
    public void testIsPrimeForLargerNumbers() {
        assertTrue(mathOps.isPrime(17));
        assertTrue(mathOps.isPrime(23));
        assertFalse(mathOps.isPrime(24));
        assertTrue(mathOps.isPrime(29));
        assertFalse(mathOps.isPrime(30));
    }
    
    @Test
    public void testGCDBasicCases() {
        assertEquals(1, mathOps.gcd(1, 1));
        assertEquals(5, mathOps.gcd(5, 5));
        assertEquals(1, mathOps.gcd(7, 11));
    }
    
    @Test
    public void testGCDWithDifferentNumbers() {
        assertEquals(6, mathOps.gcd(12, 18));
        assertEquals(4, mathOps.gcd(8, 12));
        assertEquals(7, mathOps.gcd(21, 14));
    }
    
    @Test
    public void testGCDWithNegativeNumbers() {
        assertEquals(6, mathOps.gcd(-12, 18));
        assertEquals(6, mathOps.gcd(12, -18));
        assertEquals(6, mathOps.gcd(-12, -18));
    }
    
    @Test
    public void testLCMBasicCases() {
        assertEquals(0, mathOps.lcm(0, 5));
        assertEquals(0, mathOps.lcm(5, 0));
        assertEquals(5, mathOps.lcm(1, 5));
    }
    
    @Test
    public void testLCMWithDifferentNumbers() {
        assertEquals(12, mathOps.lcm(3, 4));
        assertEquals(36, mathOps.lcm(12, 18));
        assertEquals(30, mathOps.lcm(5, 6));
    }
    
    @Test
    public void testLCMWithSameNumbers() {
        assertEquals(10, mathOps.lcm(10, 10));
    }
}
