import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

def generate_sample_data():
    """Generate sample datasets for EDA demonstration"""
    
    # Generate customers data
    n_customers = 1000
    customers = pd.DataFrame({
        'customer_id': range(1, n_customers + 1),
        'name': [f'Customer_{i}' for i in range(1, n_customers + 1)],
        'age': np.random.randint(18, 80, n_customers),
        'gender': np.random.choice(['M', 'F', 'Other'], n_customers, p=[0.48, 0.48, 0.04]),
        'city': np.random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
                                'Philadelphia', 'San Antonio', 'San Diego'], n_customers),
        'registration_date': pd.date_range(
            start=datetime.now() - timedelta(days=365*2), 
            end=datetime.now(), 
            periods=n_customers
        ),
        'annual_income': np.random.lognormal(mean=10.5, sigma=0.5, size=n_customers).astype(int)
    })
    
    # Generate transactions data
    n_transactions = 5000
    transactions = pd.DataFrame({
        'transaction_id': range(1, n_transactions + 1),
        'customer_id': np.random.choice(customers['customer_id'], n_transactions),
        'transaction_date': pd.date_range(
            start=datetime.now() - timedelta(days=90), 
            end=datetime.now(), 
            periods=n_transactions
        ),
        'amount': np.random.lognormal(mean=3.5, sigma=1.2, size=n_transactions),
        'category': np.random.choice(['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports'], 
                                   n_transactions, p=[0.25, 0.20, 0.15, 0.15, 0.15, 0.10]),
        'payment_method': np.random.choice(['Credit Card', 'Debit Card', 'PayPal', 'Cash'], 
                                         n_transactions, p=[0.4, 0.3, 0.2, 0.1])
    })
    
    return customers, transactions

def perform_eda_analysis(customers, transactions):
    """Perform comprehensive EDA with 3 plots and data join"""
    
    # Set the style for better-looking plots
    plt.style.use('seaborn-v0_8')
    sns.set_palette("husl")
    
    # Create a figure with 3 subplots
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    fig.suptitle('E-commerce Data Analysis - Exploratory Data Analysis', fontsize=16, fontweight='bold')
    
    # Join customers and transactions data
    merged_data = transactions.merge(customers, on='customer_id', how='left')
    print("Data Join Complete - Merged Shape:", merged_data.shape)
    print("\nSample of merged data:")
    print(merged_data.head())
    
    # Plot 1: Transaction Amount Distribution
    ax1 = axes[0, 0]
    sns.histplot(data=merged_data, x='amount', bins=50, ax=ax1, alpha=0.7)
    ax1.set_title('Distribution of Transaction Amounts', fontweight='bold')
    ax1.set_xlabel('Transaction Amount ($)')
    ax1.set_ylabel('Frequency')
    ax1.axvline(merged_data['amount'].median(), color='red', linestyle='--', 
                label=f'Median: ${merged_data["amount"].median():.2f}')
    ax1.legend()
    
    # Plot 2: Transaction Categories vs Age Groups
    ax2 = axes[0, 1]
    merged_data['age_group'] = pd.cut(merged_data['age'], 
                                    bins=[0, 25, 35, 50, 65, 100], 
                                    labels=['18-25', '26-35', '36-50', '51-65', '65+'])
    category_age = merged_data.groupby(['category', 'age_group']).size().unstack(fill_value=0)
    category_age.plot(kind='bar', ax=ax2, stacked=True)
    ax2.set_title('Transaction Categories by Age Group', fontweight='bold')
    ax2.set_xlabel('Category')
    ax2.set_ylabel('Number of Transactions')
    ax2.legend(title='Age Group', bbox_to_anchor=(1.05, 1), loc='upper left')
    ax2.tick_params(axis='x', rotation=45)
    
    # Plot 3: Monthly Transaction Trends
    ax3 = axes[1, 0]
    merged_data['month'] = merged_data['transaction_date'].dt.to_period('M')
    monthly_sales = merged_data.groupby('month')['amount'].agg(['sum', 'count'])
    monthly_sales.index = monthly_sales.index.to_timestamp()
    
    ax3_twin = ax3.twinx()
    line1 = ax3.plot(monthly_sales.index, monthly_sales['sum'], 'b-o', label='Total Sales ($)')
    line2 = ax3_twin.plot(monthly_sales.index, monthly_sales['count'], 'r-s', label='Transaction Count')
    
    ax3.set_title('Monthly Transaction Trends', fontweight='bold')
    ax3.set_xlabel('Month')
    ax3.set_ylabel('Total Sales ($)', color='b')
    ax3_twin.set_ylabel('Transaction Count', color='r')
    
    # Combine legends
    lines = line1 + line2
    labels = [l.get_label() for l in lines]
    ax3.legend(lines, labels, loc='upper left')
    
    # Summary statistics table
    ax4 = axes[1, 1]
    ax4.axis('tight')
    ax4.axis('off')
    
    # Create summary statistics
    summary_stats = {
        'Metric': [
            'Total Customers',
            'Total Transactions', 
            'Average Transaction Amount',
            'Total Revenue',
            'Most Popular Category',
            'Average Customer Age'
        ],
        'Value': [
            f"{customers['customer_id'].nunique():,}",
            f"{len(transactions):,}",
            f"${merged_data['amount'].mean():.2f}",
            f"${merged_data['amount'].sum():.2f}",
            merged_data['category'].mode()[0],
            f"{merged_data['age'].mean():.1f} years"
        ]
    }
    
    summary_df = pd.DataFrame(summary_stats)
    table = ax4.table(cellText=summary_df.values, colLabels=summary_df.columns,
                     cellLoc='center', loc='center', colWidths=[0.4, 0.6])
    table.auto_set_font_size(False)
    table.set_fontsize(12)
    table.scale(1.2, 2)
    ax4.set_title('Key Business Metrics', fontweight='bold', pad=20)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('/home/runner/work/week1/week1/analytics/eda_analysis.png', 
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.show()
    
    # Additional analysis and insights
    print("\n" + "="*50)
    print("DETAILED ANALYSIS INSIGHTS")
    print("="*50)
    
    # Customer insights
    print(f"\n📊 Customer Demographics:")
    print(f"   • Age distribution: {merged_data['age'].min()}-{merged_data['age'].max()} years")
    print(f"   • Gender distribution:")
    for gender, count in merged_data['gender'].value_counts().items():
        print(f"     - {gender}: {count:,} ({count/len(merged_data)*100:.1f}%)")
    
    # Transaction insights
    print(f"\n💰 Transaction Patterns:")
    print(f"   • Average transaction: ${merged_data['amount'].mean():.2f}")
    print(f"   • Median transaction: ${merged_data['amount'].median():.2f}")
    print(f"   • Highest transaction: ${merged_data['amount'].max():.2f}")
    
    # Category insights
    print(f"\n🛍️  Category Performance:")
    category_stats = merged_data.groupby('category')['amount'].agg(['count', 'sum', 'mean'])
    for category in category_stats.index:
        stats = category_stats.loc[category]
        print(f"   • {category}: {stats['count']} transactions, "
              f"${stats['sum']:.2f} total, ${stats['mean']:.2f} average")
    
    # City-based insights
    print(f"\n🏙️  Geographic Distribution:")
    city_stats = merged_data.groupby('city')['amount'].agg(['count', 'sum']).sort_values('sum', ascending=False)
    for city in city_stats.head(5).index:
        stats = city_stats.loc[city]
        print(f"   • {city}: {stats['count']} transactions, ${stats['sum']:.2f} revenue")
    
    return merged_data

def main():
    """Main function to run the EDA analysis"""
    print("🚀 Starting E-commerce Data Analysis...")
    print("="*50)
    
    # Generate sample data
    print("📊 Generating sample datasets...")
    customers, transactions = generate_sample_data()
    
    print(f"✅ Generated {len(customers):,} customers and {len(transactions):,} transactions")
    
    # Perform EDA
    print("\n🔍 Performing Exploratory Data Analysis...")
    merged_data = perform_eda_analysis(customers, transactions)
    
    # Save datasets for future use
    customers.to_csv('/home/runner/work/week1/week1/analytics/customers.csv', index=False)
    transactions.to_csv('/home/runner/work/week1/week1/analytics/transactions.csv', index=False)
    merged_data.to_csv('/home/runner/work/week1/week1/analytics/merged_data.csv', index=False)
    
    print(f"\n💾 Data saved to:")
    print(f"   • customers.csv ({len(customers):,} records)")
    print(f"   • transactions.csv ({len(transactions):,} records)")
    print(f"   • merged_data.csv ({len(merged_data):,} records)")
    print(f"   • eda_analysis.png (visualization)")
    
    print("\n🎉 Analysis complete!")

if __name__ == "__main__":
    main()