#include "array_utils.h"
#include <gtest/gtest.h>

class ArrayUtilsTest : public ::testing::Test {
protected:
    std::vector<int> empty_array;
    std::vector<int> single_element;
    std::vector<int> positive_numbers;
    std::vector<int> negative_numbers;
    std::vector<int> mixed_numbers;
    std::vector<int> with_duplicates;

    void SetUp() override {
        single_element = {5};
        positive_numbers = {1, 2, 3, 4, 5};
        negative_numbers = {-5, -4, -3, -2, -1};
        mixed_numbers = {-2, 0, 3, -1, 5};
        with_duplicates = {1, 2, 2, 3, 3, 3, 4};
    }
};

TEST_F(ArrayUtilsTest, FindMaxInPositiveNumbers) {
    EXPECT_EQ(ArrayUtils::findMax(positive_numbers), 5);
}

TEST_F(ArrayUtilsTest, FindMaxInNegativeNumbers) {
    EXPECT_EQ(ArrayUtils::findMax(negative_numbers), -1);
}

TEST_F(ArrayUtilsTest, FindMaxInMixedNumbers) {
    EXPECT_EQ(ArrayUtils::findMax(mixed_numbers), 5);
}

TEST_F(ArrayUtilsTest, FindMaxThrowsOnEmptyArray) {
    EXPECT_THROW(ArrayUtils::findMax(empty_array), std::invalid_argument);
}

TEST_F(ArrayUtilsTest, FindMinInPositiveNumbers) {
    EXPECT_EQ(ArrayUtils::findMin(positive_numbers), 1);
}

TEST_F(ArrayUtilsTest, FindMinInNegativeNumbers) {
    EXPECT_EQ(ArrayUtils::findMin(negative_numbers), -5);
}

TEST_F(ArrayUtilsTest, FindMinInMixedNumbers) {
    EXPECT_EQ(ArrayUtils::findMin(mixed_numbers), -2);
}

TEST_F(ArrayUtilsTest, FindMinThrowsOnEmptyArray) {
    EXPECT_THROW(ArrayUtils::findMin(empty_array), std::invalid_argument);
}

TEST_F(ArrayUtilsTest, SumOfPositiveNumbers) {
    EXPECT_EQ(ArrayUtils::sum(positive_numbers), 15);
}

TEST_F(ArrayUtilsTest, SumOfNegativeNumbers) {
    EXPECT_EQ(ArrayUtils::sum(negative_numbers), -15);
}

TEST_F(ArrayUtilsTest, SumOfEmptyArray) {
    EXPECT_EQ(ArrayUtils::sum(empty_array), 0);
}

TEST_F(ArrayUtilsTest, AverageOfPositiveNumbers) {
    EXPECT_DOUBLE_EQ(ArrayUtils::average(positive_numbers), 3.0);
}

TEST_F(ArrayUtilsTest, AverageThrowsOnEmptyArray) {
    EXPECT_THROW(ArrayUtils::average(empty_array), std::invalid_argument);
}

TEST_F(ArrayUtilsTest, ReverseArray) {
    std::vector<int> expected = {5, 4, 3, 2, 1};
    EXPECT_EQ(ArrayUtils::reverse(positive_numbers), expected);
}

TEST_F(ArrayUtilsTest, ReverseEmptyArray) {
    EXPECT_EQ(ArrayUtils::reverse(empty_array), empty_array);
}

TEST_F(ArrayUtilsTest, ContainsExistingElement) {
    EXPECT_TRUE(ArrayUtils::contains(positive_numbers, 3));
}

TEST_F(ArrayUtilsTest, ContainsNonExistingElement) {
    EXPECT_FALSE(ArrayUtils::contains(positive_numbers, 10));
}

TEST_F(ArrayUtilsTest, RemoveDuplicates) {
    std::vector<int> result = ArrayUtils::removeDuplicates(with_duplicates);
    std::vector<int> expected = {1, 2, 3, 4};
    EXPECT_EQ(result, expected);
}

TEST_F(ArrayUtilsTest, RemoveDuplicatesNoDuplicates) {
    std::vector<int> result = ArrayUtils::removeDuplicates(positive_numbers);
    EXPECT_EQ(result, positive_numbers);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
